export function renderHighlighted(text: string, highlightWord: string) {
  if (highlightWord && text.includes(highlightWord)) {
    const parts = text.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-accent">{highlightWord}</span>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  }
  return text;
}