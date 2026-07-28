const bcrypt = require("bcryptjs");

bcrypt.compare(
  "YourNewAdminPassword123",
  "$2b$10$Za.1IbEKUz7GtV9kMjIIZeooV5jW26b4NipOGwJt5ccigeKqCTFLC"
).then(result => console.log(result));
