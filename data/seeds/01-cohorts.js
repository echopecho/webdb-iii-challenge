
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'the best one'},
        {name: 'a decent one'},
        {name: 'the other one'}
      ]);
    });
};
