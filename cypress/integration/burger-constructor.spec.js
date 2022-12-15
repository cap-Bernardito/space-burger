import { ROUTES } from "../../src/utils/constants";

const route = (endpoint) => {
  const baseUrl = "http://localhost:3000";

  return typeof endpoint === "undefined" ? baseUrl : `${baseUrl}${endpoint.path}`;
};

describe("Приложение должно быть доступно на 3000 порту", () => {
  it("should be available on localhost:3000", () => {
    cy.visit(route(ROUTES.home));
  });
});

describe("Роутинг в приложении для неавторизованного пользователя должен корректно работать", () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.home));
  });

  it("По умолчанию открывается главная страница с конструктором бургеров", () => {
    cy.contains("Соберите бургер");
  });

  it('После клика на ссылку "Лента заказов" открывается страница ленты заказов', () => {
    cy.get("a").contains("Лента заказов").click();
    cy.contains("Выполнено за все время");
  });

  it('После клика на ссылку "Личный кабинет" открывается страница логина', () => {
    cy.get("a").contains("Личный кабинет").click();
    cy.contains("Вход");
  });

  it('После клика на ссылку "Зарегистрироваться" на странице входа открывается страница регистрации', () => {
    cy.visit(route(ROUTES.login));
    cy.get("a").contains("Зарегистрироваться").click();
    cy.contains("Регистрация");
  });

  it('После клика на ссылку "Войти" на странице регистрации открывается страница входа', () => {
    cy.visit(route(ROUTES.register));
    cy.get("a").contains("Войти").click();
    cy.contains("Вход");
  });

  it('После клика на ссылку "Восстановить пароль" на странице входа открывается страница восстановления пароля', () => {
    cy.visit(route(ROUTES.login));
    cy.get("a").contains("Восстановить пароль").click();
    cy.contains("Восстановление пароля");
  });

  it('После клика на ссылку "Войти" на странице восстановления пароля открывается страница входа', () => {
    cy.visit(route(ROUTES.forgotPassword));
    cy.get("a").contains("Войти").click();
    cy.contains("Вход");
  });

  it("После отправки формы на странице восстановления пароля открывается страница сброса пароля", () => {
    cy.visit(route(ROUTES.forgotPassword));
    cy.get("input").first().type("atata@atata.tata");
    cy.get("button").contains("Восстановить").click();
    cy.contains("Сброс пароля");
  });

  it("При прямом входе на страницу сброса пароля происходит редирект на страницу восстановления пароля", () => {
    cy.visit(route(ROUTES.resetPassword));
    cy.contains("Восстановление пароля");
  });

  it('После клика на ссылку "Конструктор" открывается главная страница', () => {
    cy.visit(route(ROUTES.login));
    cy.get("a").contains("Конструктор").click();
    cy.contains("Соберите бургер");
  });

  it("После клика на логотип открывается главная страница", () => {
    cy.visit(route(ROUTES.login));
    cy.get('a[title="Конструктор бургера"]').click();
    cy.contains("Соберите бургер");
  });
});

describe("Роутинг в приложении для авторизованного пользователя должен корректно работать", () => {
  it("После авторизации открывается главная страница", () => {
    cy.visit(route(ROUTES.login));
    cy.get('input[name="email"]').type("cap-Bernardito@yandex.ru");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Войти").click();
    cy.contains("Алексей");
    cy.contains("Соберите бургер");
  });

  it("После авторизации открывается страница, с которой пользователя средиректило на страницу входа", () => {
    cy.visit(route(ROUTES.profileOrders));
    cy.get('input[name="email"]').type("cap-Bernardito@yandex.ru");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Войти").click();
    cy.contains("Алексей");
    cy.contains("История заказов");
  });

  it('После клика на кнопку "Выход" открывается страница входа', () => {
    cy.visit(route(ROUTES.profileOrders));
    cy.get('input[name="email"]').type("cap-Bernardito@yandex.ru");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Войти").click();
    cy.get("a").contains("Выход").click();
    cy.contains("Вход");
  });
});

describe("Конструктор бургеров должен корректно работать", () => {
  beforeEach(() => {
    cy.visit(route(ROUTES.home));

    cy.get('[data-test-id="ingredient"]').contains("Краторная булка N-200i").as("draggedBun");
    cy.get('[data-test-id="drop-bun"]').as("dropBunZone");
    cy.get('[data-test-id="ingredient"]').contains("Соус Spicy-X").as("draggedMain");
    cy.get('[data-test-id="drop-ingredient"]').as("dropMainZone");
  });

  it("В конструктор должна добавляться булка", () => {
    cy.get("@draggedBun").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropBunZone").trigger("dragenter").trigger("drop");
    cy.get("@dropBunZone").contains("Краторная булка N-200i");
  });

  it("В конструктор должен добавляться ингредиент", () => {
    cy.get("@draggedMain").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropMainZone").trigger("dragenter").trigger("drop");
    cy.get("@dropMainZone").contains("Соус Spicy-X");
  });

  it("При оформлении заказа неавторизованного пользователя дожно перенаправить на страницу входа", () => {
    cy.get("@draggedBun").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropBunZone").trigger("dragenter").trigger("drop");
    cy.get("@dropBunZone").contains("Краторная булка N-200i");
    cy.get("@draggedMain").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropMainZone").trigger("dragenter").trigger("drop");
    cy.get("@dropMainZone").contains("Соус Spicy-X");
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Вход");
  });

  it("При оформлении заказа должно открыться модальное окно с информацией о заказе", () => {
    cy.visit(route(ROUTES.login));
    cy.get('input[name="email"]').type("cap-Bernardito@yandex.ru");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Войти").click();
    cy.contains("Соберите бургер");

    cy.get("@draggedBun").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropBunZone").trigger("dragenter").trigger("drop");
    cy.get("@dropBunZone").contains("Краторная булка N-200i");
    cy.get("@draggedMain").trigger("mouseenter").trigger("dragstart").trigger("drag");
    cy.get("@dropMainZone").trigger("dragenter").trigger("drop");
    cy.get("@dropMainZone").contains("Соус Spicy-X");
    cy.get("button").contains("Оформить заказ").click();
    cy.get("button").contains("Загрузка");

    cy.contains("Ваш заказ начали готовить", { timeout: 25000 });
  });
});
