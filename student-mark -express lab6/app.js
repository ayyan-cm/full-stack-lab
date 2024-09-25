const express = require("express");
const app = express();
const PORT = 3000;

function calculateGrade(avg) {
  if (avg >= 90) return "A+";
  if (avg >= 80) return "A";
  if (avg >= 70) return "B";
  if (avg >= 60) return "C";
  return "D";
}

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <form action="/student" method="post">
            Name: <input type="text" name="name" required><br><br>
            Marks 1: <input type="number" name="mark1" required><br><br>
            Marks 2: <input type="number" name="mark2" required><br><br>
            Marks 3: <input type="number" name="mark3" required><br><br>
            Marks 4: <input type="number" name="mark4" required><br><br>
            Marks 5: <input type="number" name="mark5" required><br><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post("/student", (req, res) => {
  const { name, mark1, mark2, mark3, mark4, mark5 } = req.body;
  const marksArray = [
    parseFloat(mark1),
    parseFloat(mark2),
    parseFloat(mark3),
    parseFloat(mark4),
    parseFloat(mark5),
  ];

  const avg = marksArray.reduce((a, b) => a + b, 0) / marksArray.length;
  const grade = calculateGrade(avg);
  const highest = Math.max(...marksArray);
  const lowest = Math.min(...marksArray);

  res.send(`
        <h1>Results for ${name}</h1>
        <p>Average: ${avg}</p>
        <p>Grade: ${grade}</p>
        <p>Highest: ${highest}</p>
        <p>Lowest: ${lowest}</p>
        <a href="/">Go Back</a>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
