interface Resources {
  "auth": {
    "form": {
      "fields": {
        "email": {
          "label": "Email",
          "placeholder": "Zadajte váš email",
          "errorMessage": "Zadajte platný email"
        },
        "password": {
          "label": "Heslo",
          "placeholder": "Zadajte vaše heslo",
          "errorMessage": "Zadajte vaše heslo"
        }
      },
      "buttons": {
        "login": "Prihlásiť sa"
      }
    }
  },
  "settings": {
    "settings": {
      "title": "Nastavenia",
      "theme": {
        "label": "Téma",
        "options": {
          "light": "Svetlá",
          "dark": "Tmavá"
        }
      },
      "language": {
        "label": "Jazyk",
        "options": {
          "en": "Angličtina",
          "sk": "Slovenčina"
        }
      }
    }
  },
  "shared": {
    "appName": "Hive",
    "loader": {
      "messages": {
        "default": "Načítavam..."
      }
    },
    "errorPage": {
      "title": "Chyba",
      "message": "Vyskytla sa neočakávaná chyba.",
      "unexpectedTitle": "Neočakávaná chyba"
    },
    "notFoundPage": {
      "title": "Ups! Stránka nenájdená",
      "message": "Stránka, ktorú hľadáte, neexistuje.",
      "button": "Prejsť na domovskú stránku"
    }
  }
}

export default Resources;
