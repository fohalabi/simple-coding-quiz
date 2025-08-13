import { Question } from '../types/questionData';

export const questions: Question[] = [
  {
    id: 1,
    title: "Array Method Issue",
    code: `function removeItem(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }
  return arr;
}`,
    language: "javascript",
    question: "What's wrong with this function that removes items from an array?",
    options: [
      "Nothing wrong, it works perfectly",
      "It skips elements after removing an item",
      "It doesn't return anything",
      "It modifies the original array"
    ],
    correctAnswer: 1,
    explanation: "When you remove an item with splice(), the array length changes and elements shift. This causes the loop to skip the next element. Solution: iterate backwards or use filter()."
  },
  {
    id: 2,
    title: "Async/Await Problem",
    code: `async function fetchUserData(userIds) {
  const users = [];
  for (let id of userIds) {
    const user = await fetch(\`/api/users/\${id}\`);
    users.push(user.json());
  }
  return users;
}`,
    language: "javascript",
    question: "What issues exist in this async function?",
    options: [
      "Missing try-catch for error handling",
      "user.json() should be awaited",
      "Requests run sequentially instead of parallel",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Multiple issues: user.json() needs await, no error handling, and requests should run in parallel with Promise.all() for better performance."
  },
  {
    id: 3,
    title: "React Hook Issue",
    code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  });
  
  return <div>{user?.name}</div>;
}`,
    language: "javascript",
    question: "What's the problem with this React component?",
    options: [
      "useState should be initialized with empty object",
      "useEffect is missing dependency array",
      "fetchUser should be awaited",
      "Component name should be lowercase"
    ],
    correctAnswer: 1,
    explanation: "Missing dependency array in useEffect causes infinite re-renders. Should be useEffect(() => {...}, [userId]) to only run when userId changes."
  },
  {
    id: 4,
    title: "CSS Flexbox Layout",
    code: `.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  overflow: scroll;
}

.footer {
  flex-shrink: 0;
}`,
    language: "css",
    question: "What could be improved in this CSS layout?",
    options: [
      "Use overflow: auto instead of scroll",
      "Add flex-grow: 1 to footer",
      "Remove height: 100vh from container",
      "Nothing needs improvement"
    ],
    correctAnswer: 0,
    explanation: "overflow: scroll always shows scrollbars even when not needed. overflow: auto only shows them when content overflows."
  },
  {
    id: 5,
    title: "Security Vulnerability",
    code: `app.get('/search', (req, res) => {
  const query = req.query.q;
  const sql = \`SELECT * FROM products 
              WHERE name LIKE '%\${query}%'\`;
  
  db.query(sql, (err, results) => {
    res.json(results);
  });
});`,
    language: "javascript",
    question: "What security issue exists in this code?",
    options: [
      "No input validation",
      "SQL injection vulnerability",
      "No error handling",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "This code has SQL injection vulnerability (user input directly in query), no input validation, and no proper error handling. Use parameterized queries instead."
  }
];
