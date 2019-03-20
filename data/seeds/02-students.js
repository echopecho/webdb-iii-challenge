
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Davis', cohort_id: 1},
        {name: 'Sammy', cohort_id: 3},
        {name: 'Emma', cohort_id: 2}
      ]);
    });
};
