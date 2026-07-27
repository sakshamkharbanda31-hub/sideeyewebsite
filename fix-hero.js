const fs = require('fs');

const filePath = 'app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldStart = 'const [showAnim, setShowAnim] = React.useState(() => {';
const oldEnd = '}, [showAnim]);';

const startIndex = content.indexOf(oldStart);
const endIndex = content.indexOf(oldEnd, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('WARNING: Could not find the target block. No changes made.');
} else {
  const fullOldBlock = content.slice(startIndex, endIndex + oldEnd.length);

  const newBlock = `const [showAnim, setShowAnim] = React.useState(false);

  React.useEffect(() => {
    const alreadyAnimated = sessionStorage.getItem("heroAnimated");
    if (!alreadyAnimated) {
      setShowAnim(true);
      const timer = setTimeout(() => {
        sessionStorage.setItem("heroAnimated", "true");
        setShowAnim(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);`;

  content = content.replace(fullOldBlock, newBlock);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('SUCCESS: File updated.');
}