const themes = [
  "Travail",
  "Famille",
  "Soirée",
  "Transports",
  "Enfance - Adolescence",
];

const themeHtml = `<label class="anec--checkbox-field">
<input type="checkbox" class="filled-in" value="__label__" name="theme" />
<span>__label__</span>
</label>`;

const appendStylesheetFromS3 = () => {
  const headID = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "https://d2pep12re1brfc.cloudfront.net/dist/index.css";
  headID.appendChild(link);
};

const getUrlParameter = (sParam) => {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

const env = getUrlParameter("env");
if (env !== false) {
}

$(function () {
  const $themesContainer = $("#anec--themes-container");
  const $checkboxAppendTheme = $("#anec--append-theme-checkbox");
  const $inputAppendTheme = $("#anec--append-theme-text");
  const $form = $("#form");
  const $anecLoader = $(".anec--loader");
  const $body = $("body");

  let serverUrl =
    env !== false ? "http://localhost:4000" : "https://server.anecgame.com/";
  let gameFrontUrl =
    env !== false
      ? "http://localhost:3000"
      : "https://www.anecgame.com/anec-game.html";

  const disableCheckbox = (disabled) => {
    if (!disabled) {
      $checkboxAppendTheme.removeAttr("disabled");
    } else {
      $checkboxAppendTheme.attr("disabled", "disabled");
    }
  };

  const appendTheme = (theme, checked) => {
    const themeContent = themeHtml.replaceAll("__label__", theme);
    const themeContentHtml = $.parseHTML(themeContent);
    if (checked) {
      $("input[type='checkbox']", themeContentHtml).prop("checked", true);
    }
    $themesContainer.append(themeContentHtml);
  };

  $inputAppendTheme.keyup(() => {
    const value = $inputAppendTheme.val();
    if (value === "") {
      disableCheckbox(true);
    } else {
      disableCheckbox(false);
    }
  });
  $checkboxAppendTheme.change(function () {
    if (this.checked) {
      disableCheckbox(true);
      const label = $inputAppendTheme.val();
      appendTheme(label, true);
      $inputAppendTheme.val("");
      $checkboxAppendTheme.prop("checked", false);
    }
  });
  $form.submit(function () {
    const values = $(this).serializeArray();
    let gameName = "";
    let pseudo = "";
    let themes = [];
    values.forEach((v) => {
      const { name, value } = v;
      switch (name) {
        case "game_name":
          gameName = value;
          break;
        case "pseudo":
          pseudo = value;
          break;
        case "theme":
          themes.push(value);
      }
    });
    $body.css("overflow", "hidden");
    $anecLoader.removeClass("anec--loader-hide");
    const body = {
      function: "createGame",
      args: {
        gameName,
        pseudo,
        themes,
      },
    };
    $.post(serverUrl, JSON.stringify(body)).then((roomID) => {
      window.location.href = `${gameFrontUrl}?roomID=${roomID}&autoConnect=true`;
    });
    return false;
  });

  themes.forEach((theme) => appendTheme(theme));
});
