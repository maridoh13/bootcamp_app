const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const args = process.argv.slice(2);

const query = `
SELECT cohorts.name as cohort, teachers.name AS name
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE ('%${args[0]}%')
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`;

pool.query(query)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.name}`);
    }) 
  })
  .catch(err => console.error('query error', err.stack)
);
