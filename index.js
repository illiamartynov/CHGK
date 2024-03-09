document.addEventListener("DOMContentLoaded", function () {
    var endDate = new Date("March 1, 2024 22:00:00").getTime();
  
    var timer = document.getElementById("timer");
    var voteBtn = document.getElementById("voteBtn");
    var vote = document.getElementsByClassName("vote");
    var options = document.querySelectorAll('input[name="vote"]');
    var msg = document.getElementById("message");
    var lockImg = document.createElement("img");
    lockImg.src = "./lock.png";
    lockImg.style.width = "calc((100 / 400) * 100vmin)";
    lockImg.style.height = "calc((100 / 400) * 100vmin)";
    lockImg.style.position = "absolute";
    lockImg.style.left = "50%";
    lockImg.style.top = "50%";
    lockImg.style.transform = "translate(-50%, -50%)";
  
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = endDate - now;
  
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timer.innerHTML =
        "Осталось времени: " +
        days +
        "д " +
        hours +
        "ч " +
        minutes +
        "м " +
        seconds +
        "с ";
  
      if (distance <= 0) {
        clearInterval(x);
        timer.innerHTML = "Таймер завершился! Голосование открыто!";
        enableVoting();
        hideVoteBeforeStyle();
      } else {
        voteBtn.disabled = true;
        msg.disabled = true;
        options.forEach(function (option) {
          option.disabled = true;
        });
        voteBtn.innerHTML = "";
        vote[0].appendChild(lockImg);
      }
    }, 1000);
  
    function enableVoting() {
      var voteBtn = document.getElementById("voteBtn");
      var options = document.getElementsByName("vote");
      voteBtn.disabled = false;
  
      voteBtn.addEventListener("click", function () {
        var selectedOption;
        for (var i = 0; i < options.length; i++) {
          if (options[i].checked) {
            selectedOption = options[i].value;
            break;
          }
        }
        var message = document.getElementById("message").value;
        console.log(selectedOption);
        // Prepare data for EmailJS
        var data = {
          service_id: "service_05tafjl",
          template_id: "template_xg1qjei",
          user_id: "ktlZuULWWNmxU-Cfg",
          template_params: {
            player: selectedOption, 
            message: message,
          },
        };
  
        $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
          type: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
        })
          .done(function () {
            console.log(data);
            alert("Ваше письмо отправлено!");
          })
          .fail(function (error) {
            alert("Упс... " + JSON.stringify(error));
          });
      });
    }
  
    function hideVoteBeforeStyle() {
      var voteStyles = document.styleSheets[0].cssRules;
      for (var i = 0; i < voteStyles.length; i++) {
        if (
          voteStyles[i].selectorText === ".vote::before" &&
          voteStyles[i].style.pointerEvents === "none"
        ) {
          voteStyles[i].style.display = "none";
          break;
        }
      }
    }
  });
  