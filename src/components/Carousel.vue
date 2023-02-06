<template>
    <h1>{{ email }}</h1>
    <v-carousel height="120" hide-delimiter-background show-arrows="hover" class="br-8">
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="'/lights/' + slide">
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import api from '../api';
import axios from 'axios';
export default {
    data() {
        return {
            slides: [
                '1.png',
            ],
            email: ''
        }
    },
    /*methods: {
        async reformatSliderImg(imgArr) {
            imgArr.map(img => {
                let Img = img.replace('\"\\/lights\\/', '');
                let mmImg = Img.substring(0, Img.length - 1).replace(/['||"]/, '');
                if (mmImg[0] == "[") {
                    this.slides.push(mmImg.substring(1))
                } else {
                    this.slides.push(mmImg)
                }
                console.log(this.slides)
            })
        }
    },*/
    mounted() {
        // this.slides = JSON.parse(localStorage.getItem('slides'))
        try {
            axios.get('http://api.cybdzw.com/api/configs')
                .then(function (res) {
                    // Handle success
                    this.slides = res.data.data[res.data.data.length - 1].config_value;
                    localStorage.setItem('serviceUrl', res.data.data[6].config_value);
                }.bind(this));

            axios.get('https://jsonplaceholder.typicode.com/users', {
                method: 'HEAD',
                mode: 'no-cors',
            })
                .then(function (res) {
                    // Handle success
                    // this.slides = res.data.data[res.data.data.length - 1].config_value;
                    // localStorage.setItem('serviceUrl', res.data.data[6].config_value);
                    console.log(res);
                    this.email = res.data[0].email;

                }.bind(this))
        } catch (error) {
            alert(error);
            console.log("geterr", error);
        }
    },
}
</script>
