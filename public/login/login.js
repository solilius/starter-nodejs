function login() {
  if ($("#username").val() == "" || $("#password").val() == "") {
    Swal.fire({
      icon: "warning",
      title: "חסרים פרטים",
      text: "אנא ודא שהכנסת משתמש וסיסמה",
      confirmButtonText: "אוקיי",
      confirmButtonColor: "orange"
    });
    swal("חסרים פרטים", "אנא ודא שהכנסת משתמש וסיסמה", "warning");
  } else {
    $.post("/login", {
      username: $("#username").val(),
      password: $("#password").val()
    }).done(function(res) {
        localStorage.setItem("username", res);
        location.href = "/manager";
      })
      .fail(function() {
        Swal.fire({
          icon: "error",
          title: "You Shall Not Pass!",
          text: "אחד מפרטי ההתחברות שגויים, או שנדפק לנו השרת",
          confirmButtonText: "אופס",
          confirmButtonColor: "red"
        });
      });
  }
}
