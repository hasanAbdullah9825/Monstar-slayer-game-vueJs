const randomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0
        };
    },
    computed: {

        monsterBarStyle() {
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = randomValue(10, 17);
            if ((this.monsterHealth - attackValue) <= 0) {
                this.monsterHealth = 0;
                this.attackPlayer();
            }
            else {
                this.monsterHealth -= attackValue;
                console.log(this.monsterHealth);
                this.attackPlayer();
            }
        },
        attackPlayer() {
            const attackValue = randomValue(10, 20);
            if ((this.playerHealth - attackValue) <= 0) {
                this.playerHealth = 0;
            }
            else {
                this.playerHealth -= attackValue;
            }

        },
        specialAttackMonster() {
            const attackValue = randomValue(22, 30);

            if ((this.monsterHealth - attackValue) <= 0) {
                this.monsterHealth = 0;
            }
            else {
                this.monsterHealth -= attackValue;
            }
            this.attackPlayer();
        }

    },
    watch: {

    }
});
app.mount('#game');