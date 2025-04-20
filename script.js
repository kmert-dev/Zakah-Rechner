const infoTexte = {
    1: "Diese Methode berechnet den Wert von Gold in 24 Karat. Du gibst das Gewicht in Gramm und den Karatwert ein.",
    2: "Diese Methode berechnet die Zakah für Silber (925 Karat) in Euro. Du gibst das Gewicht, Karat und Preis pro Gramm (1g 925er Silber in Euro) an.",
    3: "Diese Methode berechnet die Zakah für 24K Gold in Euro. Du gibst das Gewicht und Preis pro Gramm (1g 24er Gold in Euro) an.",
    4: "Diese Methode berechnet die Zakah auf Bargeld, basierend auf dem aktuellen Gold- oder Silberpreis (1g 999er Feinsilber in Euro)."
  };
  
  function updateInfoText() {
    const method = document.getElementById("method").value;
    document.getElementById("infoText").innerText = infoTexte[method] || "Wähle eine Methode aus.";
    updateInputs(method);
  }
  
  function updateInputs(method) {
    const container = document.getElementById("inputsContainer");
    container.innerHTML = "";
  
    const createInput = (label, id, type = "number") => {
      const labelEl = document.createElement("label");
      labelEl.textContent = label;
      const inputEl = document.createElement("input");
      inputEl.id = id;
      inputEl.type = type;
      inputEl.step = "any";
      container.appendChild(labelEl);
      container.appendChild(inputEl);
    };
  
    if (method === "1") {
      createInput("Goldmenge (Gramm)", "gold");
      createInput("Karat", "karat");
    } else if (method === "2") {
      createInput("Silbermenge (Gramm)", "sb");
      createInput("Karat", "karat");
      createInput("Preis pro Gramm (€)", "preis");
    } else if (method === "3") {
      createInput("Goldmenge (Gramm)", "gold");
      createInput("Preis pro Gramm (€)", "preis");
    } else if (method === "4") {
      createInput("Papiergeldwert (€)", "papier");
      const label = document.createElement("label");
      label.textContent = "Nisab-Methode wählen:";
      const select = document.createElement("select");
      select.id = "nisabMethod";
      select.innerHTML = `
        <option value="gold">Gold (85g, 24K)</option>
        <option value="silber">Silber (595g, 999K)</option>
      `;
      container.appendChild(label);
      container.appendChild(select);
      createInput("Preis pro Gramm (€)", "preis");
    }
  }
  
  function berechne() {
    const method = document.getElementById("method").value;
    let result = "";
  
    const parseValue = id =>
      parseFloat(document.getElementById(id).value.replace(",", "."));
  
    if (method === "1") {
      const gold = parseValue("gold");
      const karat = parseValue("karat");
      result = `${(gold * karat / 24).toFixed(2)}g 24K Gold`;
    }
  
    else if (method === "2") {
      const sb = parseValue("sb");
      const karat = parseValue("karat");
      const preis = parseValue("preis");
      const sum = preis * sb / 100 * 2.5;
      result = `${sum.toFixed(2)}€ Zakah`;
    }
  
    else if (method === "3") {
      const gold = parseValue("gold");
      const preis = parseValue("preis");
      const sum = gold * preis / 100 * 2.5;
      result = `${sum.toFixed(2)}€ Zakah`;
    }
  
    else if (method === "4") {
      const papier = parseValue("papier");
      const preis = parseValue("preis");
      const methode = document.getElementById("nisabMethod").value;
  
      const nisab = methode === "gold" ? 85 * preis : 595 * preis;
      if (papier >= nisab) {
        const zakah = papier / 100 * 2.5;
        result = `Zakah Pflicht: ${zakah.toFixed(2)}€`;
      } else {
        result = "Keine Zakah nötig (unter Nisab)";
      }
    }
  
    document.getElementById("result").innerText = result;
  }