export default {

    state: {
        currentQuestion:  parseInt(localStorage.getItem('currentQuestion')) || null,
        totalScore:  parseInt(localStorage.getItem('totalScore')) || 0
    },

    getters: {
        totalScore(state) {
            return state.totalScore;
        }
    },

    actions: {

        startQuiz(context, start){
            localStorage.setItem('currentQuestion', start);
            localStorage.setItem('totalScore', 0);
            context.commit('setCurrentQuestion', start);
            context.commit('setTotalScore', 0);
        },

        updateQuestion(context, question) {
            localStorage.setItem('currentQuestion', question);
            context.commit('updateCurrentQuestion', question);
        },

        addToScore(context, point) {
            localStorage.setItem('totalScore', point);
            context.commit('updateTotalScore', point);
        },

        restartQuiz (context) {
            localStorage.removeItem('currentQuestion');
            localStorage.removeItem('totalScore');
            context.commit('restartQuestions');
        }

    },

    mutations: {

        setCurrentQuestion(state, payload) {
            state.currentQuestion = payload;
        },

        setTotalScore(state, payload) {
            state.totalScore = payload;
        },

        updateCurrentQuestion(state, payload) {
            state.currentQuestion = payload;
        },

        updateTotalScore(state, payload) {
            state.totalScore = payload;
        },

        restartQuestions(state) {
            state.currentQuestion = null;
            state.totalScore = 0;
        }
    }
};
