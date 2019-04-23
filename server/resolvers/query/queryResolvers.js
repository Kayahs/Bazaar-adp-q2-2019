const authenticate = require("../authenticate");

const buildUpdate = (input, selector) => {
    const validKeys = Object.keys(input).filter(
        key => input[key] != null && key != selector
    );
    const finalString = validKeys
        .map((key, i) => `${key} = $${i + 2}`)
        .join(", ");
    const queryValues = validKeys.map(key => input[key]);
    queryValues.unshift(input[selector]);
    return {
        text: `UPDATE boilerplate.users SET ${finalString} WHERE ${selector} = $1`,
        values: queryValues
    };
};

module.exports = {
    Query: {
        async test(parent, _, { postgres }, info) {
            const input = {
                id: 1,
                fullname: null,
                email: "akshay@akshay.com",
                gender: null
            };
            const query = buildUpdate(input, "id");

            const getUsers = await postgres.query(query);
            // console.log(getUsers);
            return "done";
        }
        // async user(parent, { id }, { app, req, postgres }, info) {
        //   authenticate(app, req)
        //   const findUserQuery = {
        //     text: 'SELECT * FROM boilerplate.users WHERE id = $1',
        //     values: [id],
        //   }
        //   const user = await postgres.query(findUserQuery)

        //   if (user.rows.length < 1) {
        //     throw 'User does not exist'
        //   }
        //   return user.rows[0]
        // },
        // async getAllUsers(parent, _, { app, req, postgres }, info) {
        //   authenticate(app, req)
        //   const findUserQuery = {
        //     text: 'SELECT * FROM boilerplate.users',
        //   }
        //   const user = await postgres.query(findUserQuery)

        //   if (user.rows.length < 1) {
        //     throw 'No users'
        //   }
        //   return user.rows
        // },
    }
};
