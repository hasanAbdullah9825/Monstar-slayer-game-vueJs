const randomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({

    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            round: 0,
            winner: null,
            history:[]
        };
    },
    computed: {

        monsterBarStyle() {
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' }
        },
        disableSpecialAttack() {

            return (this.round % 3 !== 0) || (this.round == 0);

        }
    },
    methods: {
        attackMonster() {
            console.log(this.history)
            const attackValue = randomValue(10, 17);
            this.addRecord("player","attack",attackValue);
            if ((this.monsterHealth - attackValue) <= 0) {
                this.monsterHealth = 0;
                this.attackPlayer();
               
            }
            else {
                this.monsterHealth -= attackValue;

                this.attackPlayer();
            }

            this.round++;
            
        },
        attackPlayer() {
            const attackValue = randomValue(10, 20);
            this.addRecord("monstar","attack",attackValue);
            if ((this.playerHealth - attackValue) <= 0) {
                this.playerHealth = 0;
            }
            else {
                this.playerHealth -= attackValue;
            }


        },
        specialAttackMonster() {
            const attackValue = randomValue(22, 30);
            this.addRecord("player","specialattack",attackValue);

            if ((this.monsterHealth - attackValue) <= 0) {
                this.monsterHealth = 0;
            }
            else {
                this.monsterHealth -= attackValue;
            }
            this.attackPlayer();
            this.round++;

        },
        healPlayer() {

            const healValue = randomValue(30, 40);
            this.addRecord("player","heal",healValue);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healValue;
                this.attackPlayer();
            }

            this.round++;
        },
        surrender() {
            this.playerHealth = 0;
            this.addRecord("player","surrender",0);
        },
        addRecord(who,action,actionValue){
            this.history.unshift({who:who,action:action,value:actionValue});

        }

    },
    watch: {
        playerHealth(value) {
            if (value === 0 && this.monsterHealth === 0) {
                this.winner = "Draw";
            }
            else if (value === 0) {
                this.winner = "Monster";
            }

        },
        monsterHealth(value) {
            if (value === 0 && this.playerHealth === 0) {
                this.winner = "Draw";
            }
            else if (value === 0) {
                this.winner = "Player";
            }
        }



    }

    
});
app.mount('#game');