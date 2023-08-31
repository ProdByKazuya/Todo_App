import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    appTitle: 'My Todo application',
                    addButton: 'Add',
                    editButton: 'Edit',
                    deleteButton: 'Delete',
                    saveButton: 'Save',
                    cancelButton:'Cancel',
                    todoTitle: 'Enter the name of the tusk',
                    todoText: 'Enter the text of the tusk',
                    todoPriority: 'Priority',
                    todoUrgent: 'Urgent',
                    todoDesirable: 'Desirable',
                    todoNotIsUrgent: 'Not is urgent',
                    titleRequire: 'Title is required',
                    textRequire: 'Text is required'
                }
            },
            ru: {
                translation: {
                    appTitle: 'Мое приложение для задач',
                    addButton: 'Добавить',
                    editButton: 'Изменить',
                    deleteButton: 'Удалить',
                    saveButton: 'Сохранить',
                    cancelButton: 'Отменить',
                    todoTitle: 'Введите название задачи',
                    todoText: 'Введите описание задачи',
                    todoPriority: 'Важность',
                    todoUrgent: 'Срочно!',
                    todoDesirable: 'Желательно',
                    todoNotIsUrgent: 'Не срочно',
                    titleRequire: 'Название обязательно',
                    textRequire: 'Описание обязательно'
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })
