main = {
    values : {
        eyeball_toggle: false,
        feature_toggle : false
    },
    sign_in_up_on_load : function() {
        sign_in_up({
            call_on_sign_in_or_sign_up : function() {
                main.utility.remove_sign_in();
            }
        });
    },
    dummy_function : function() {
        if(main.values.feature_toggle === true) {
            const img = document.createElement("img");
            img.src = "asdfas";
            document.body.append(img);
        }
    },
    menu_item_click: function() {
        document.querySelectorAll(".top_banner_item").forEach(function(elem) {
            elem.addEventListener("click", function(e) {
                if (e.target.tagName === "IMG") {
                    main.utility.fill_side_menu({
                        items : config.settings_options
                    });
                } else if (event.target.tagName === "DIV") {
                    main.utility.fill_side_menu({
                        items : pipeline_items[this.innerText.toLowerCase().trim()]
                    });
                };
            })
        });
    },
    side_menu: function() {
        if (!document.getElementById("side_menu")) {
            const side_menu = document.createElement("div");
            side_menu.id = "side_menu";
            side_menu.className = "side_menu";
            document.body.append(side_menu);
        }
    }
}