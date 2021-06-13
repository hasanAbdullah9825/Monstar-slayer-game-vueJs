const randomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null
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
        },
        healPlayer() {

            const healValue = randomValue(30, 40);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healValue;
                this.attackPlayer();
            }
        }

    },
   watch: {
        playerHealth(value) {
            if (value === 0 && this.monsterHealth === 0) {
                this.winner = "Draw";
            }
            else if(value===0) {
                this.winner = "Monster";
            }
             
        },
        monsterHealth(value){
            if (value === 0 && this.playerHealth === 0) {
                this.winner = "Draw";
            }
            else if(value===0) {
                this.winner = "Player";
            }
        }

       

    }

    // watch: {
    //     playerHealth(value) {
    //       if (value <= 0 && this.monsterHealth <= 0) {
    //         // A draw
    //         this.winner = 'draw';
    //       } else if (value <= 0) {
    //         // Player lost
    //         this.winner = 'monster';
           
    //       }
    //     },
    //     monsterHealth(value) {
    //       if (value <= 0 && this.playerHealth <= 0) {
    //         // A draw
    //         this.winner = 'draw';
    //       } else if (value <= 0) {
    //         // Monster lost
    //         this.winner = 'player';
    //       }
    //     }
    //   }
});
app.mount('#game');