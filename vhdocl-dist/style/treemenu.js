  /* 
   * Fügt den Listeneinträgen Eventhandler und CSS Klassen hinzu,
   * um die Menüpunkte am Anfang zu schließen.
   * 
   * menu: Referenz auf die Liste.
   * data: String, der die Nummern aufgeklappter Menüpunkte enthält.
   */
  function treeMenu_init(menu, data) {
    var array = new Array(0);
    if(data != null && data != "") {
      array = data.match(/\d+/g);
    }
    var items = menu.getElementsByTagName("li");
    for(var i = 0; i < items.length; i++) {
      items[i].onclick = treeMenu_handleClick;
      if(!treeMenu_contains(treeMenu_getClasses(items[i]), "treeMenu_opened")
          && items[i].getElementsByTagName("ul").length
            + items[i].getElementsByTagName("ol").length > 0) {
        var classes = treeMenu_getClasses(items[i]);
        if(array.length > 0 && array[0] == i) {
          classes.push("treeMenu_opened")
        }
        else {
          classes.push("treeMenu_closed")
        }
        items[i].className = classes.join(" ");
      }
      if(array.length > 0 && array[0] == i) {
        array.shift();
      }
    }
  }
  
  /*
   * Ändert die Klasse eines angeclickten Listenelements, sodass
   * geöffnete Menüpunkte geschlossen und geschlossene geöffnet
   * werden.
   *
   * event: Das Event Objekt, dass der Browser übergibt.
   */
  function treeMenu_handleClick(event) {
    if(event == null) { //Workaround für die fehlenden DOM Eigenschaften im IE
      event = window.event;
      event.currentTarget = event.srcElement;
      while(event.currentTarget.nodeName.toLowerCase() != "li") {
        event.currentTarget = event.currentTarget.parentNode;
      }
      event.cancelBubble = true;
    }
    else {
      event.stopPropagation();
    }
    var array = treeMenu_getClasses(event.currentTarget);
    for(var i = 0; i < array.length; i++) {
      if(array[i] == "treeMenu_closed") {
        array[i] = "treeMenu_opened";
      }
      else if(array[i] == "treeMenu_opened") {
        array[i] = "treeMenu_closed"
      }
    }
    event.currentTarget.className = array.join(" ");
  }

  /**
  * Close or open the whole tree
  */
  function treeMenu_closeOrOpenAll(closeTree) {

    menu = document.getElementById('listhierarchy');

    var items = menu.getElementsByTagName("li");


    for(var i = 0; i < items.length; i++) {

        var array = treeMenu_getClasses(items[i].currentTarget);

        for(var j = 0; j < array.length; j++) {
            if (closeTree) {
                array[j] = "treeMenu_closed"
            } else {
                array[j] = "treeMenu_opened";
            }
        }

        items[i].currentTarget.className = array.join(" ");
    }
  }
  
  /*
   * Gibt alle Klassen zurück, die einem HTML-Element zugeordnet sind.
   * 
   * element: Das HTML-Element
   * return: Die zugeordneten Klassen.
   */
  function treeMenu_getClasses(element) {
    if(element.className) {
      return element.className.match(/[^ \t\n\r]+/g);
    }
    else {
      return new Array(0);
    }
  }
  
  /*
   * Überprüft, ob ein Array ein bestimmtes Element enthält.
   * 
   * array: Das Array
   * element: Das Element
   * return: true, wenn das Array das Element enthält.
   */
  function treeMenu_contains(array, element) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] == element) {
        return true;
      }
    }
    return false;
  }
  
  /*
   * Gibt einen String zurück, indem die Nummern aller geöffneten
   * Menüpunkte stehen. 
   *
   * menu: Referenz auf die Liste
   * return: Der String
   */
  function treeMenu_store(menu) {
    var result = new Array();;
    var items = menu.getElementsByTagName("li");
    for(var i = 0; i < items.length; i++) {
      if(treeMenu_contains(treeMenu_getClasses(items[i]), "treeMenu_opened")) {
        result.push(i);
      }
    }
    return result.join(" ");
  }
