<template>

    <div class="container">

        <div class="row">

            <div class="col-lg-12">

                <h1>Quick Quiz Game</h1>

                <template v-if="currentQuestion < 1">

                    <h2>Hello and welcome to this quiz. Do your best!</h2>

                    <button class="btn btn-primary" @click="startQuiz">Let Us Begin</button>

                </template>

                <template v-else-if="currentQuestion > 5">

                    <h2 v-if="scoreColour === 'green'" >WOW! Congratulations!!! You got them all correct! Well done you!</h2>
                    <h2 v-else-if="scoreColour === 'blue'">Nice work there! You didn't get them all right, but good try</h2>
                    <h2 v-else-if="scoreColour === 'yellow'">Not the best score is it. Have another go.</h2>
                    <h2 v-else-if="scoreColour === 'orange'">I am sure you can do better than that. Why not have another go?</h2>
                    <h2 v-else >DEE-AMN! How could you not get a single question right. Think someone needs to go back to school!</h2>

                    <template v-if="scoreColour === 'green' || scoreColour === 'blue'">

                        <div class="container py-4">
                            <div class="col-md-10 col-lg-8 mx-auto">

                                <div v-show="error" class="alert alert-danger" role="alert" v-text="error"></div>
                                <div v-show="success" class="alert alert-success" role="alert" v-text="success"></div>

                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <h1 class="h4">Please complete the form below.</h1>
                                    </div>
                                </div>

                                <div class="row">

                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="inputfirstname">First Name</label>
                                            <input type="text" class="form-control" :class="{'is-invalid' : errors.has('firstname')}" id="inputfirstname" placeholder="Enter First Name" v-model="form.firstname" name="firstname" v-validate="'required'">
                                            <div class="invalid-feedback" v-if="errors.has('firstname')">{{ errors.first('firstname') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="inputLastname">Last Name</label>
                                            <input type="text" class="form-control" :class="{'is-invalid' : errors.has('lastname')}" id="inputLastname" placeholder="Enter Last Name" v-model="form.lastname" name="lastname" v-validate="'required'">
                                            <div class="invalid-feedback" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="inputEmail">Email address</label>
                                            <input type="email" class="form-control" :class="{'is-invalid' : errors.has('email')}" id="inputEmail" placeholder="Enter Email Address" v-model="form.email" name="email" v-validate="'required|email'">
                                            <div class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</div>
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <button class="btn btn-success" @click="validateForm" :disabled="loading">{{ loading ? 'Sending...' : 'Email Results'}}</button>
                                            <img v-if="loading" src="@sass/images/loading.gif" alt="" width="30px">
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </template>

                    <template v-else>
                        <button class="btn btn-primary" @click="restartQuiz">Start again</button>
                    </template>

                </template>

                <template v-else>

                    <h2>Let us begin. Good Luck!!!</h2>

                    <div class="answers" :style="{'background': scoreColour }">
                        {{ totalScore }}/5
                    </div>

                    <transition name="fade" mode="out-in">

                        <div v-for="q in questions" class="question" :key="q.id" v-if="currentQuestion === q.id">

                            <h3>{{ q.id}}. {{ q.question }}</h3>

                            <template v-for="(ans, key) in q.answers">
                                <br>
                                <input type="radio" name="radios">
                                <label @click="answerQuestion($event, ans.correct)" :style="{ 'pointer-events' : pointerEvent }">{{ key+1 }}. {{ ans.answer }}</label>
                            </template>

                        </div>

                    </transition>

                    <transition name="fade" mode="out-in">
                        <div class="progress mt-20" style="height: 35px;" v-if="currentProgress > 1">
                            <div class="progress-bar" role="progressbar" :style="{ width: currentProgress + '%' }" :aria-valuenow="currentProgress" aria-valuemin="0" aria-valuemax="100">{{ currentProgress }}%</div>
                        </div>
                    </transition>

                </template>

            </div>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import data from '@/_data';

    export default {

        name: "App",

        data() {
            return {
                pointerEvent: '',
                questions: data,
                loading: false,
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    score: ''
                },
                error: '',
                success: ''
            }
        },

        created() {

            // Get the information from the questions.
            for (let key in this.questions) {

                // Get the answers object from the questions data.
                let obj = this.questions[key].answers;

                // Shuffle the answers.
                let shuffled = _.shuffle(obj);

                // Clear the present answers.
                this.questions[key].answers = [];

                // Enter the shuffled answers into the questions.
                this.questions[key].answers = shuffled;

            }

        },

        methods: {

            // Start the quiz.
            startQuiz () {

                // Set the store currentQuestion to 1.
                this.$store.dispatch('startQuiz', 1);

            },

            // Answer the questions.
            answerQuestion (event, ans) {

                this.shuffled = true;

                // Disable answer clicks
                this.pointerEvent = 'none';

                // If the answer is correct.
                if (ans === true) {

                    // Show that the user has got the question right.
                    $(event.target).addClass('rightans');

                    // Add to the final score.
                    let point = parseInt(localStorage.getItem('totalScore')) + 1;
                    this.$store.dispatch('addToScore', point);
                }
                // Otherwise.
                else{
                    $(event.target).addClass('wrongans');
                }

                // Update the Store current page.
                let cp = localStorage.getItem('currentQuestion');
                let newPage = parseInt(cp) + 1;

                // Set a timer before moving to the next question.
                setTimeout(() => {
                    this.$store.dispatch('updateQuestion', newPage);
                    // Reset the pointer.
                    this.pointerEvent = '';
                }, 2000);

            },

            // Validate the form.
            validateForm () {

                // Clear any error messages.
                this.error = '';
                this.success = '';

                // Validate the form before processing the userLogin method.
                this.$validator.validateAll()
                    .then(result => {

                        if(result) {
                            // Log user in.
                            this.emailResults();
                        }
                        else {

                            // Set the error message.
                            this.error = "Please complete the form below.";
                        }
                    });

            },

            // Email quiz results and start fresh.
            emailResults() {

                // Start the loading image to inform the user that something is happening.
                this.loading = true;

                // Add the final score the the form object.
                this.form.score = this.$store.getters.totalScore;

                // Send the information via an API call
                axios.post('/api/email', {
                   ...this.form
                })
                .then(response => {

                    // Stop the loading process.
                    this.loading = false;

                    // Show the user the success message.
                    this.success = response.data + ' You will be redirected to the start shortly.';

                    // Restart quiz after done with data.
                    setTimeout(() => {
                        this.restartQuiz();
                    }, 2500);
                })
                .catch(error => {

                    // Stop the loading process.
                    this.loading = false;

                    // Show user the error message.
                    this.error = "There seems to be a problem. Please try again later.";

                });

            },

            // Restart the quiz.
            restartQuiz () {

                // Set state to null and restart the quiz.
                this.$store.dispatch('restartQuiz');
            }
        },

        computed: {

            currentQuestion () {
                return this.$store.state.currentQuestion
            },

            totalScore () {
                return this.$store.state.totalScore
            },

            currentProgress () {
                return (this.$store.state.currentQuestion-1) * 20
            },

            scoreColour () {

                if (this.$store.state.totalScore === 5) {
                    return 'green';
                }
                else if (this.$store.state.totalScore >= 3 && this.$store.state.totalScore <= 4) {
                    return 'blue';
                }
                else if (this.$store.state.totalScore >= 1 && this.$store.state.totalScore <= 2) {
                    return 'orange';
                }
                else {
                    return 'red'
                }
            }
        }

    }
</script>
