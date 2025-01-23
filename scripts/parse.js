parse = {
    fetch_result: {},
    fetch_result_id: "",
    contact_acme: function(contactInfo) {
        const parse_classname = "contact";
        const NewObject = Parse.Object.extend(parse_classname);
        const newObject = new NewObject();
        newObject.set("name", contactInfo.name);
        newObject.set("email", contactInfo.email);
        newObject.set("message", contactInfo.message);
        newObject.save().then((res) => {
            parse.fetch_result_id = res.id;
            console.log("saved!");
            if (contactInfo.hasOwnProperty("call_on_save")) {
                contactInfo.call_on_save();
            }
        }).catch((error) => {
            console.log(error);
        });
    },
    save_or_update_to_parse: function(parse_classname, parse_column_name, data, options = {}) {
        const user = parse.check_if_user_signed_in().user;
        const NewObject = Parse.Object.extend(parse_classname);
        if (options.objectId) {
            const query = new Parse.Query(parse_classname);
            query.get(options.objectId).then((existingObject) => {
                existingObject.set(parse_column_name, JSON.stringify(data));
                return existingObject.save();
            }).then((res) => {
                parse.fetch_result_id = res.id;
                console.log("updated!");
                if (options.hasOwnProperty("call_on_save")) {
                    options.call_on_save();
                }
            }).catch((error) => {
                console.log("Error updating object:", error);
            });
        } else {
            const newObject = new NewObject();
            newObject.set("user_id", user.id);
            newObject.set(parse_column_name, JSON.stringify(data));
            newObject.save().then((res) => {
                parse.fetch_result_id = res.id;
                console.log("saved!");
                if (options.hasOwnProperty("call_on_save")) {
                    options.call_on_save();
                }
            }).catch((error) => {
                console.log("Error saving object:", error);
            });
        }
    },
    fetch_config: function(parse_classname, options = {}) {
        const user = parse.check_if_user_signed_in().user;
        if (!user) {
            console.error("User not signed in.");
            return Promise.reject("User not signed in.");
        }
        const query = new Parse.Query(parse_classname);
        query.equalTo("user_id", user.id);

        if (options.hasOwnProperty("limit")) {
            query.limit(options.limit);
        }
        if (options.hasOwnProperty("ascending")) {
            query.ascending(options.ascending);
        }
        if (options.hasOwnProperty("descending")) {
            query.descending(options.descending);
        }
        return query.find().then((results) => {
            options.call_on_success(results);
        }).catch((error) => {
            options.call_if_nothing_returned(error);
        });
    },
    add_new_user: function(options) {
        main.utility.spinner()
        const User = Parse.Object.extend("_User");
        const newUser = new User();
        newUser.set("username", options.username);
        newUser.set("password", options.password);
        newUser.set("email", options.email);
        newUser.set("client", options.client);
        newUser.save().then((user) => {
            parse.new_user_id = user.id;
            console.log("New user added!");
            main.utility.remove_spinner();
            // Manually log in the user after successful sign-up
            Parse.User.logIn(options.username, options.password).then((loggedInUser) => {
                console.log("User logged in:", loggedInUser);
                // Optionally, you can store the session token for future requests
                const sessionToken = loggedInUser.getSessionToken();
                localStorage.setItem("sessionToken", sessionToken);
                options.call_on_success();
            }).catch((loginError) => {
                console.error("Error logging in user after sign-up:", loginError);
            });
        }).catch((saveError) => {
            alert(saveError);
            console.error(saveError);
        });
    },
    sign_in_user: async function(username, password, options) {
        main.utility.spinner();
        try {
            var user = await Parse.User.logIn(username, password);
            options.call_on_success();
            main.utility.remove_spinner();
        } catch (error) {
            main.utility.remove_spinner();
            alert(error.message);
            options.call_on_fail();
        }
    },
    check_if_user_signed_in: function() {
        var res = {};
        var currentUser = Parse.User.current();
        if(currentUser) {
            res.bool = true;
            res.user = currentUser;
        } else {
            res.bool = false;
        }
        return (res)
    },
    log_user_out: function() {
        main.utility.spinner();
        Parse.User.logOut().then(() => {
            parse.currentUser = Parse.User.current();
            console.log("user logged out");
            location.reload();
        });
    },
}