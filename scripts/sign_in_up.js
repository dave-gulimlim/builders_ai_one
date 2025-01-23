sign_in_up = function(options) {
    if (parse.check_if_user_signed_in().bool) {
        
    } else {
        const html = `
            <div id="hold_sign_in">
            <img id="sign_in_logo" src="img/talent_round_logo_1.webp">
            <div id="hold_sign_in_wrapper">
                <div id="sign_in_wrapper">
                    <div id="sign_in_up_title">SIGN IN</div>
                    <div id="sign_in_item_1"></div>
                    <div id="sign_in_item_2"></div>
                    <div id="sign_in_item_3"></div>
                </div>
                </div>
                </div>
                `;
        document.body.innerHTML += html;
        const input_email = document.createElement("input");
        input_email.id = "input_email";
        input_email.placeholder = "email...";
        input_email.spellcheck = false;
        const passwordContainer = document.createElement("div");
        passwordContainer.className = "password-container";
        const password_input_container = document.createElement("div");
        password_input_container.id = "password_input_container";
        password_input_container.style.position = "relative";
        const input_password = document.createElement("input");
        input_password.id = "input_password";
        input_password.type = "password";
        input_password.placeholder = "password...";
        input_password.spellcheck = false;
        password_input_container.append(input_password);
        const eyeball = document.createElement("img");
        eyeball.id = "eyeball";
        eyeball.className = "eyeball";
        eyeball.src = "img/icons/eye_close.svg";
        eyeball.style.position = "absolute";
        eyeball.style.top = "30px";
        eyeball.style.right = "6px";
        eyeball.style.cursor = "pointer";
        password_input_container.append(eyeball);
        setTimeout(function() {
            document.getElementById("eyeball").addEventListener("click", function() {
                main.values.eyeball_toggle = !main.values.eyeball_toggle;
                if (main.values.eyeball_toggle) {
                    document.getElementById("eyeball").src = "img/icons/eye_open.svg";
                    document.getElementById("input_password").type = "text";
                } else {
                    document.getElementById("eyeball").src = "img/icons/eye_close.svg";
                    document.getElementById("input_password").type = "password";
                };
            });
        }, 200);
        document.getElementById("sign_in_item_1").append(input_email);
        document.getElementById("sign_in_item_2").append(password_input_container);
        const forgot_password = document.createElement("span");
        forgot_password.id = "forgot_password";
        forgot_password.innerText = "forgot password?"
        document.getElementById("sign_in_item_2").append(forgot_password);
        setTimeout(function() {
            document.getElementById("input_email").addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    main.utility.trigger_event({
                        target_id: "sign_in_button",
                        event: "click"
                    })
                }
            });
            document.getElementById("input_email").addEventListener('input', function() {
                this.value = this.value.toLowerCase();
            });
            document.getElementById("input_password").addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    main.utility.trigger_event({
                        target_id: "sign_in_button",
                        event: "click"
                    })
                }
            });
            document.getElementById("forgot_password").addEventListener("click", function() {
                var use_email_for_reset = document.getElementById("input_email").value;
                if (use_email_for_reset === "") {
                    alert("Add your email to the email field first, then click here again.");
                } else {
                    main.utility.spinner();
                    Parse.Cloud.run("sendPasswordReset", {
                        email: use_email_for_reset
                    }).then((response) => {
                        console.log(response); // Password reset email sent successfully.
                        main.utility.remove_spinner();
                        alert("Password reset link sent to your email.")
                    }).catch((error) => {
                        console.error("Error:", error.message);
                    });
                };
            });
        }, 2000)
        const sign_in_button = document.createElement("button");
        sign_in_button.id = "sign_in_button";
        sign_in_button.innerText = "SIGN IN";
        const sign_up_button = document.createElement("button");
        sign_up_button.id = "sign_up_button";
        sign_up_button.innerText = "SIGN UP";
        const hold_buttons = `
                <div id="hold_buttons_wrapper">
                    <div id="hold_buttons_item_1"></div>
                    <div id="hold_buttons_item_2"></div>
                    <div id="hold_buttons_item_3"></div>
                </div>
                `;
        document.getElementById("hold_sign_in_wrapper").innerHTML += hold_buttons;
        document.getElementById("hold_buttons_item_1").append(sign_in_button);
        document.getElementById("hold_buttons_item_2").append(sign_up_button);
        sign_in_button.addEventListener("click", function() {
            const input_1 = document.getElementById("input_email");
            const input_2 = document.getElementById("input_password")
            if (validate_input(input_1) && validate_input(input_2)) {
                sign_in({
                    username: document.getElementById("input_email").value,
                    password: document.getElementById("input_password").value,
                    call_on_success: function() {
                        main.utility.remove_sign_in();
                    },
                    call_on_fail: function() {
                        console.log("fail")
                        input_1.value = "";
                        input_2.value = "";
                    }
                })
            } else {
                const input_1 = document.getElementById("input_email");
                const input_2 = document.getElementById("input_password")
                input_1.classList.add("rubberband");
                input_2.classList.add("rubberband");
                input_1.classList.add("red_outline");
                input_2.classList.add("red_outline");
                setTimeout(function() {
                    input_1.classList.remove("rubberband");
                    input_2.classList.remove("rubberband");
                    input_1.classList.remove("red_outline");
                    input_2.classList.remove("red_outline");
                }, 1500)
            }
        })
        sign_up_cnt = 0;
        sign_up_button.addEventListener("click", function() {
            if (document.getElementById("forgot_password") !== null) {
                document.getElementById("forgot_password").remove();
            }
            sign_up_cnt++;
            if (sign_up_cnt === 1) {
                document.getElementById("sign_in_up_title").innerText = "SIGN UP";
                document.getElementById("sign_in_button").style.display = "none";
                const cancel_button = document.createElement("button");
                cancel_button.id = "cancel_button";
                cancel_button.innerText = "CANCEL";
                document.getElementById("hold_buttons_item_3").append(cancel_button);
                cancel_button.addEventListener("click", function() {
                    main.utility.spinner({
                        id: "cancel_spinner"
                    })
                    location.reload();
                })
                const input_password_confirm = document.createElement("input");
                input_password_confirm.id = "input_password_confirm";
                input_password_confirm.type = "password";
                input_password_confirm.placeholder = "confirm password...";
                document.getElementById("sign_in_item_3").append(input_password_confirm);
            }
            if (sign_up_cnt === 2) {
                const input_email = document.getElementById("input_email");
                const input_password = document.getElementById("input_password");
                const input_confirm_password = document.getElementById("input_password_confirm");
                if (validate_input(input_email) && validate_input(input_password) && validate_input(input_confirm_password)) {
                    if (input_password.value === input_confirm_password.value) {
                        sign_up({
                            username: input_email.value,
                            email: input_email.value,
                            password: input_password.value,
                            call_on_success: function() {
                                main.utility.remove_sign_in();
                               // options.call_on_sign_in_or_sign_up();
                            }
                        })
                    } else {
                        sign_up_cnt--;
                        alert("passwords don't match")
                    }
                } else {
                    sign_up_cnt--;
                    input_email.classList.add("rubberband");
                    input_password.classList.add("rubberband");
                    input_confirm_password.classList.add("rubberband");
                    input_email.classList.add("red_outline");
                    input_password.classList.add("red_outline");
                    input_confirm_password.classList.add("red_outline");
                    setTimeout(function() {
                        input_email.classList.remove("rubberband");
                        input_password.classList.remove("rubberband");
                        input_confirm_password.classList.remove("rubberband");
                        input_email.classList.remove("red_outline");
                        input_password.classList.remove("red_outline");
                        input_confirm_password.classList.remove("red_outline");
                    }, 1500)
                }
            }
        })

        function validate_input(elem) {
            var validate = false;
            if (elem.value !== "" && elem.value !== " ") {
                validate = true;
            }
            return (validate)
        }

        function sign_up(options) {
            parse.add_new_user({
                username: options.email,
                email: options.email,
                password: options.password,
                call_on_success: function() {
                    options.call_on_success();
                }
            })
        }

        function sign_in(options) {
            parse.sign_in_user(options.username, options.password, {
                call_on_success: function() {
                    options.call_on_success();
                },
                call_on_fail: function() {
                    options.call_on_fail();
                }
            });
        }
    }
}