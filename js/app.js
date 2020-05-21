new Vue({
  el: "#app",
  data: {
    gameIsStarted: false,
    isFirstRound: false,
    yourHP: 100,
    monsterHP: 100,
    hits: [],
  },
  methods: {
    attackEnemy: function () {
      this.monsterAttack();
      if (this.checkResult()) {
        return;
      }

      let playerDamage = this.hitDamage(5);
      this.monsterHP -= playerDamage;
      this.hits.unshift({
        isPlayer: true,
        text: "You hit monster at " + playerDamage + " hp",
      });
      if (this.checkResult()) {
        return;
      }
    },
    specialAttackEnemy: function () {
      this.monsterAttack();
      if (this.checkResult()) {
        return;
      }

      let playerDamage = this.hitDamage(10);
      this.monsterHP -= playerDamage;
      this.hits.unshift({
        isPlayer: true,
        text: "You crash monster at " + playerDamage + " hp",
      });
      if (this.checkResult()) {
        return;
      }
    },
    healYourself: function () {
      this.monsterAttack();
      if (this.checkResult()) {
        return;
      }
      if (this.yourHP < 91) {
        this.yourHP += 10;
      } else {
        this.yourHP = 100;
      }
      this.hits.unshift({
        isPlayer: true,
        text: "You have healed 10 hp",
      });
    },
    surrenderYourself: function () {
      this.gameIsStarted = false;
    },
    hitDamage: function (bonus) {
      return Math.floor(Math.random() * (10 - 5 + 1)) + bonus;
    },
    monsterAttack: function () {
      let monsterDamage = this.hitDamage(6);
      this.yourHP -= monsterDamage;
      this.hits.unshift({
        isPlayer: false,
        text: "Monster hits you at " + monsterDamage + " hp",
      });
    },
    checkResult: function () {
      if (this.monsterHP < 1) {
        if (confirm("You won! New Game?")) {
          this.resetApp();
        } else {
          this.gameIsStarted = false;
        }
        return true;
      } else if (this.yourHP < 1) {
        if (confirm("You lose.. New Game?")) {
          this.resetApp();
        } else {
          this.gameIsStarted = false;
        }
        return true;
      }
      return false;
    },
    resetApp: function () {
      this.gameIsStarted = true;
      this.isFirstRound = false;
      this.yourHP = 100;
      this.monsterHP = 100;
      this.hits = [];
    },
  },
});
