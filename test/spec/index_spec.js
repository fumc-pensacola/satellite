module("Index", {
  setup: function () {
    Fumc.reset();
  }
});

test("First H1 contains Fumc", function () {
  visit('/').then(function () {
    equal($('#ember h1').html(), 'Fumc', 'Title is Fumc');
  });
});

