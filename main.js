(()=>{"use strict";function e(e,n,r,o,c){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__delete-button");e===n.owner._id?i.addEventListener("click",r):i.style.display="none";var u=a.querySelector(".card__like-button");u.addEventListener("click",o);var s=a.querySelector(".card__image");return s.addEventListener("click",c),a.id=n._id,s.src=n.link,s.alt=n.name,a.querySelector(".card__title").textContent=n.name,function(e,t,n){e.likes.some((function(e){return e._id===t}))&&n.classList.add("card__like-button_is-active")}(n,e,u),t(n,a),a}function t(e,t){t.querySelector(".card__likes-count").textContent=e.likes.length>0?e.likes.length:""}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),document.addEventListener("click",c)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),document.removeEventListener("click",c)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.contains("popup_is-opened")&&r(e.target)}var a,i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},u=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){i(e,n,t)})),l(r,t)},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):l(t,n)},l=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},d={baseURL:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"320df562-e03c-4e12-adb7-946c662f4a40","Content-Type":"application/json"}},p=function(e,t){return e.then((function(e){return e.ok?e.json():Promise.reject("Запрос ".concat(t," завершился с ошибкой: ").concat(e.status))}))},f=function(e){var t=fetch("".concat(d.baseURL,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers});return p(t,"putLike")},_=function(e){var t=fetch("".concat(d.baseURL,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers});return p(t,"deleteLike")},m=document.querySelector(".places__list"),v=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_image"),S=document.querySelector(".popup__image"),g=document.querySelector(".popup__caption"),L=document.querySelector(".popup_type_avatar-edit"),b=document.querySelector(".profile__image"),q=document.querySelector(".profile__add-button"),E=document.querySelector(".profile__edit-button"),k=document.querySelector('form[name="edit-profile"]'),C=k.querySelector(".popup__input_type_name"),U=k.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),R=document.querySelector('form[name="new-place"]'),w=R.querySelector(".popup__input_type_card-name"),B=R.querySelector(".popup__input_type_url"),P=document.querySelector('form[name="avatar-edit"]'),D=P.querySelector(".popup__input_type_avatar-url"),N=document.querySelectorAll(".popup"),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},j=void 0;function I(e){S.src=e.currentTarget.src,S.alt=e.currentTarget.alt,g.textContent=e.currentTarget.alt,n(h)}function J(e){(function(e){var t=fetch("".concat(d.baseURL,"/cards/").concat(e),{method:"DELETE",headers:d.headers});p(t,"deleteCard")})(e.target.closest(".places__item").id),function(e){e.target.closest(".places__item").remove()}(e)}function M(e){var n=e.target.closest(".places__item"),r=n.id;(e.target.classList.contains("card__like-button_is-active")?_:f)(r).then((function(r){t(r,n),function(e){e.target.classList.toggle("card__like-button_is-active")}(e)})).catch((function(e){return console.log(e)}))}function H(e,t){t.querySelector(O.submitButtonSelector).textContent=e?"Сохранение...":"Сохранить"}N.forEach((function(e){var t;e.classList.add("popup_is-animated"),(t=e).addEventListener("click",(function(e){e.target.classList.contains("popup__close")&&r(t)}))})),q.addEventListener("click",(function(){n(v)})),b.addEventListener("click",(function(){n(L),u(P,O)})),E.addEventListener("click",(function(){C.value=x.textContent,U.value=A.textContent,u(k,O),n(y)})),P.addEventListener("submit",(function(e){var t,n;e.preventDefault(),(t=D.value,n=fetch("".concat(d.baseURL,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:t})}),p(n,"patchUserAvatar")).then((function(e){r(L),T.style="background-image: url(".concat(e.avatar,");"),P.reset(),u(P,O)})).catch((function(e){console.log(e)})).finally((function(){H(!1,e.target)})),H(!0,e.target)})),k.addEventListener("submit",(function(e){var t,n,o;e.preventDefault(),(t=C.value,n=U.value,o=fetch("".concat(d.baseURL,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:t,about:n})}),p(o,"patchUserInfo")).then((function(e){x.textContent=e.name,A.textContent=e.about,r(y)})).catch((function(e){console.log(e)})).finally((function(){H(!1,e.target)})),H(!0,e.target)})),R.addEventListener("submit",(function(t){var n,o,c;t.preventDefault(),(n=w.value,o=B.value,c=fetch("".concat(d.baseURL,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:n,link:o})}),p(c,"addNewCard")).then((function(t){var n=e(j,t,J,M,I);m.prepend(n),u(R,O),R.reset(),r(v)})).catch((function(e){console.log(e)})).finally((function(){H(!1,t.target)})),H(!0,t.target)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(O),Promise.all([(a=fetch("".concat(d.baseURL,"/users/me"),{headers:d.headers}),p(a,"getUserInfo")),function(){var e=fetch("".concat(d.baseURL,"/cards"),{headers:d.headers});return p(e,"getInitialCards")}()]).then((function(t){var n=t[0],r=t[1];x.textContent=n.name,A.textContent=n.about,T.style="background-image: url(".concat(n.avatar,");"),j=n._id,r.forEach((function(t){var n=e(j,t,J,M,I);m.append(n)}))})).catch((function(e){console.log(e)}))})();