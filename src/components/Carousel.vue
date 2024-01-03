<template>
    <v-carousel height="120" hide-delimiter-background show-arrows="hover" class="br-8">
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="'/lights/' + slide">
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import api from '../api';

export default {
    data() {
        return {
            slides: [
                '1.png',
            ],
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
            api.get('/api/configs')
                .then(res => {
                    console.log(res)
                    this.slides = res.data.data[res.data.data.length-1].config_value;
                    localStorage.setItem('serviceUrl', res.data.data[6].config_value);
                });

        } catch (error) {
            alert(error);
            console.log("geterr", error);
        }
    },
}
</script>
