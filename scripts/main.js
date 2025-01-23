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
            elem.addEventListener("click", function() {
                main.side_menu({
                    banner_name : elem.innerText.toLowerCase().trim()
                });
            })
        });
    },
    side_menu: function(options) {
        if (!document.getElementById("side_menu")) {
            const side_menu = document.createElement("div");
            side_menu.id = "side_menu";
            side_menu.className = "side_menu";
            document.body.append(side_menu);
            main.utility.fill_side_menu({
                items : pipeline_items[options.banner_name]
            })
        }
    },
    data_visualization : {
        radial_chart : function(options) {
            data = [{
                type: 'scatterpolar',
                r: options.values,
                theta: options.labels,
                fill: 'toself',
                marker: {
                    color: 'red'
                  },
                  line: {
                    color: 'limegreen',
                    width: 2
                  },
                  fillcolor: 'rgba(0, 128, 255, 0.3)' 
              }];
              const layout = {
                polar: {
                  bgcolor: 'rgba(0, 0, 0, 0)',
                  radialaxis: {
                    visible: true,
                    range: [0, 50],
                    color: 'white'
                  },
                  angularaxis: {
                    color: 'white'
                  }
                },
                showlegend: false,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                margin : {
                    t : 20,
                    l : 20,
                    r: 20,
                    b : 20,
                    p : 20
                }
              };
              const config = {
                displayModeBar: false
              };
              Plotly.newPlot(options.target_id, data, layout, config)
        }
    },
    machine_learning: {
        cluster_skills: async function (skills) {
            try {
                const result = await Parse.Cloud.run("normalizeSkills", { skills });
                console.log("Normalized Skills:", result);
            } catch (error) {
                console.error("Error clustering skills:", error);
    
                // Log additional error details if available
                if (error.code) {
                    console.error("Error code:", error.code);
                }
                if (error.message) {
                    console.error("Error message:", error.message);
                }
            }
        }
    },    
    utility: {
        spinner: function() {
            if (!document.getElementById("spinner")) {
                const div = document.createElement("div");
                div.id = "spinner";
                div.className = "lds-circle";
                const inner_div = document.createElement("div");
                div.append(inner_div);
                document.body.append(div);
                inner_div.style.boxShadow = "2px 2px 20px black";
                inner_div.style.backgroundImage = "url(img/spinner_logo.webp)";
                inner_div.style.backgroundSize = "cover";
            }
        },
        remove_spinner: function() {
            if (document.querySelector(".lds-circle") !== null) {
                document.querySelector(".lds-circle").remove();
            }
        },
        remove_sign_in: function() {
            if (document.getElementById("hold_sign_in") !== null) {
                document.getElementById("hold_sign_in").remove();
            };
            if (document.getElementById("sign_in_wrapper") !== null) {
                document.getElementById("sign_in_wrapper").remove();
            };
            if (document.getElementById("hold_buttons_wrapper") !== null) {
                document.getElementById("hold_buttons_wrapper").remove();
            };
        },
        fill_side_menu : function(options) {
            options.items.forEach(function(item) {
                const div = document.createElement("div");
                div.className = "side_menu_item";
                div.innerText = item;
                document.getElementById("side_menu").append(div);
                div.addEventListener("click", function() {
                    main.data_visualization.radial_chart({
                        target_id : "item_3",
                        values : [10, 20, 15, 7],
                        labels : ["python", "hadoop", "teamwork", "javascript"]
                     });

                     main.dummy_function();

                });
            });
        },
        trigger_event: function(options) {
            var clickEvent = new MouseEvent(options.event, {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            document.getElementById(options.target_id).dispatchEvent(clickEvent);
        },
        upload_pdf: async function() {
            const fileInput = document.getElementById("pdf-file");
            const file = fileInput.files[0];
            if (!file) {
                alert("Please select a file to upload.");
                return;
            }
            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed.");
                return;
            }
            try {
                const parseFile = new Parse.File(file.name, file);
                await parseFile.save();
                const FileObject = new Parse.Object(config.parse_resume_class);
                FileObject.set(config.parse_resume_column_name, parseFile);
                await FileObject.save();
                alert("PDF uploaded successfully!");
            } catch (error) {
                console.error("Error uploading PDF:", error);
                alert("Failed to upload PDF. Check the console for details.");
            }
        },
        extract_keywords_from_pdf : function(options) {
            const objectId = options.objectId;
            Parse.Cloud.run("extractKeywordsFromResume", { objectId })
            .then((response) => {
                console.log("Extracted Keywords:", response.keywords);
                
            })
            .catch((error) => {
                console.error("Error extracting keywords:", error);
            });
        }
    }
}