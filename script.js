'use strict';

// Получаем ссылки на необходимые элементы из HTML-разметки
const reviewForm = document.getElementById("review-form");
const reviewsContainer = document.getElementById("reviews-container");

// Обработчик отправки формы
reviewForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения из полей формы
    const name = document.getElementById("name").value;
    const product = document.getElementById("product").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // Создаем объект отзыва
    const review = {
        name: name,
        product: product,
        rating: rating,
        comment: comment
    };

    // Получаем уже существующие отзывы из localStorage
    let existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Добавляем новый отзыв в массив
    existingReviews.push(review);

    // Сохраняем обновленный массив отзывов в localStorage
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    // Очищаем контейнер отзывов перед отображением
    reviewsContainer.innerHTML = "";

    // Отображаем все отзывы
    existingReviews.forEach(function (review) {
        const reviewElement = document.createElement("div");
        reviewElement.innerHTML = `
      <h3>${review.name}</h3>
      <p><strong>Продукт:</strong> ${review.product}</p>
      <p><strong>Оценка:</strong> ${review.rating}</p>
      <p><strong>Комментарий:</strong> ${review.comment}</p>
      <button class="delete-btn">Удалить</button>
    `;
        reviewsContainer.appendChild(reviewElement);
        const newReview = reviewElement.querySelector(".delete-btn");
        newReview.addEventListener("click", function () {
            const index = existingReviews.indexOf(review);
            existingReviews.splice(index, 1);
            localStorage.setItem("reviews", JSON.stringify(existingReviews));
            reviewElement.remove();
            newReview.remove();
            if (existingReviews.length === 0) {
                reviewsContainer.innerHTML = "<p>Отзывы отсутствуют</p>";
            }
        })
    });

    // Сбрасываем значения полей формы
    reviewForm.reset();
});

// При загрузке страницы отображаем уже существующие отзывы из localStorage
window.addEventListener("load", function () {
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    existingReviews.forEach(function (review) {
        const reviewElement = document.createElement("div");
        reviewElement.innerHTML = `
      <h3>${review.name}</h3>
      <p><strong>Продукт:</strong> ${review.product}</p>
      <p><strong>Оценка:</strong> ${review.rating}</p>
      <p><strong>Комментарий:</strong> ${review.comment}</p>
      <button class="delete-btn">Удалить</button>
    `;
        reviewsContainer.appendChild(reviewElement);
        const newReview = reviewElement.querySelector(".delete-btn");
        newReview.addEventListener("click", function () {
            const index = existingReviews.indexOf(review);
            existingReviews.splice(index, 1);
            localStorage.setItem("reviews", JSON.stringify(existingReviews));
            reviewElement.remove();
            newReview.remove();
            if (existingReviews.length === 0) {
                reviewsContainer.innerHTML = "<p>Отзывы отсутствуют</p>";
            }
        })
    });
});