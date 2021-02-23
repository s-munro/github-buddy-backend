exports.seed = function (knex) {
  return knex("users").then(function () {
    return knex("users").insert([
      {
        user_first_name: "Sam",
        user_last_name: "Munro",
        user_email: "email@email.com",
        user_password: "password",
      },
    ]);
  });
};
