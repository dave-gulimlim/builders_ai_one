main = {
    menu_item_click : function() {
        document.querySelectorAll(".top_banner_item").forEach(function(elem) {
            elem.addEventListener("click", function() {
                main.side_menu()
            })
        });
    },
    side_menu : function() {
        if(!document.getElementById("side_menu")) {
            const side_menu =document.createElement("div");
            side_menu.id = "side_menu";
            side_menu.style.width = "300px";
            side_menu.style.height = "100%";
            side_menu.style.background = "#7f8fa6";
            side_menu.style.boxShadow = "2px 2px 10px black";
            document.body.append(side_menu);
        }
    }
}