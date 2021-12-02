new Vue({
    el: '#app',
    data: {
        running: false,
        nome: '', //nome do personagem
        playerLife: 100,
        monsterLife: 100,
        playerStamina: 100,
        level: 1,
        levelMonster: 1,
        logs: [],
        image: '', //raça escolhida
        race: [
            "img/race/anao.png",
            "img/race/elf.png",
            "img/race/human.png",
            "img/race/wolfman.png",
            "img/race/spectre.png"
        ],
        special: '',
        specialimg1: "img/special.png",
        specialimg2: "img/special2.png",
        weapon: '',
        weapon1: "img/sword.png",
        weapon2: "img/gun.png",
        selectedMonster: '',
        selectedPlace: '',
        imagesMonster: [
            "img/monster/dragon.png",
            "img/monster/goblin.png",
            "img/monster/orc.png",
            "img/monster/rat.png",
            "img/monster/skull.png",
        ],
        imagesFight: [
            "img/place/bgfight.jpg",
            "img/place/bgfight3.jpg",
            "img/place/bgfight2.jpg"
        ],
        boss: "img/monster/witch.png",
        selected: undefined,
        limit: 25,
        limitElixir: 25,
        limitEspecial: 15,
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(e) {

            //verifica se o campo nome foi digitado e se a raça foi escolhida
            if (this.nome != '' && this.image != '') {

                this.running = true
                this.playerLife = 100
                this.monsterLife = 100
                this.playerStamina = 100
                this.logs = []
                this.limit = 25
                this.limitElixir = 25
                this.limitEspecial = 15

                this.selectedMonster = this.random(this.imagesMonster)

                this.levelMonster = Math.floor(Math.random() * 10) + 1

                if (this.selectedMonster == "img/monster/dragon.png") {

                    this.monsterName = 'Dragão'

                } else if (this.selectedMonster == "img/monster/goblin.png") {

                    this.monsterName = 'Goblin'

                } else if (this.selectedMonster == "img/monster/orc.png") {

                    this.monsterName = 'Orc'

                } else if (this.selectedMonster == "img/monster/rat.png") {

                    this.monsterName = 'Rato'

                } else {

                    this.monsterName = 'Esqueleto'
                    
                }

                this.selectedPlace = this.imagesFight[0]

            } else if(this.nome == '') {

                // this.errors.push('O nome é obrigatório.');
                // e.preventDefault();

                // toast('alerta', 'Atenção!', 'O campo nome  <strong>nome</strong> antes de prosseguir.', 'centro', 'sim');
            } else if(this.image == '') {

            }

        },
        continueGame() {
            
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.playerStamina = 100
            this.logs = []
            this.limit = 25
            this.limitElixir = 25
            this.limitEspecial = 15

            if (this.level >= this.levelMonster || this.level == 9) {
                this.level += 1
            } else {
                if (this.levelMonster >= 3 && this.levelMonster < 5) {
                    this.level += 2
                } else {
                    this.level += 3
                }
            }

            if (this.level < 10 || this.level > 10) {

                this.selectedMonster = this.random(this.imagesMonster)

                this.levelMonster = Math.floor(Math.random() * 10) + 1

                if (this.selectedMonster == "img/monster/dragon.png") {

                    this.monsterName = 'Dragão'

                } else if (this.selectedMonster == "img/monster/goblin.png") {

                    this.monsterName = 'Goblin'

                } else if (this.selectedMonster == "img/monster/orc.png") {

                    this.monsterName = 'Orc'

                } else if (this.selectedMonster == "img/monster/rat.png") {

                    this.monsterName = 'Rato'

                } else {

                    this.monsterName = 'Esqueleto'

                }
                
            } else if (this.level == 10) {

                this.selectedMonster = this.boss
                this.levelMonster = 15
                this.monsterName = 'Bruxa'

            }

            if (this.level > 10) {

                this.selectedPlace = this.imagesFight[1]

            } else if (this.level > 10) {

                this.selectedPlace = this.imagesFight[2]

            } else {

                this.selectedPlace = this.imagesFight[0]

            }
            
        },
        attack(especial) {

            if (this.playerStamina > 0) {

                if (this.level >= this.levelMonster) {

                    if (this.limitEspecial <= 15 && this.limitEspecial > 0) {
                        this.hurt('monsterLife', 5, 10, especial, this.nome, this.monsterName, 'player')
                        this.limitEspecial--
                    }

                    if (this.monsterLife > 0) {

                        this.hurt('playerLife', 7, 12, false, this.monsterName, this.nome, 'monster')
                        this.hurtStamina('playerStamina', 7, 13, especial)
                    }

                } else {

                    if (this.limitEspecial <= 15 && this.limitEspecial > 0) {
                        this.hurt('monsterLife', 3, 6, especial, this.nome, this.monsterName, 'player')
                        this.limitEspecial--
                    }
                    if (this.monsterLife > 0) {
                        if (this.monsterName == 'Bruxa') {
                            this.hurt('playerLife', 8, 17, false, this.monsterName, this.nome, 'monster')
                            this.hurtStamina('playerStamina', 8, 13, especial)
                        } else {
                            if (this.level < 5) {
                                this.hurt('playerLife', 8, 14, false, this.monsterName, this.nome, 'monster')
                                this.hurtStamina('playerStamina', 6, 12, especial)
                            } else {
                                this.hurt('playerLife', 10, 16, false, this.monsterName, this.nome, 'monster')
                                this.hurtStamina('playerStamina', 8, 14, especial)
                            }
                        }
                    }

                }

            } else {

                this.registerLog(`${this.nome} está sem Stamina`, 'staminaA')

            }
        },
        hurt(atr, min, max, especial, source, target, cls) {

            const plus = especial ? 5 : 0

            const hurt = this.getRandom(min + plus, max + plus)

            this[atr] = Math.max(this[atr] - hurt, 0)

            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)

        },
        hurtStamina(atr, min, max, especial) {

            const plus = especial ? 5 : 0

            const hurtStamina = this.getRandom(min + plus, max + plus)

            this[atr] = Math.max(this[atr] - hurtStamina, 0)

        },
        healAndHurt() {

            if (this.limit <= 25 && this.limit > 0) {

                if (this.playerLife != 100) {

                    this.heal(10, 15)

                    this.hurt('playerLife', 7, 12, false, this.monsterName, this.nome, 'monster')

                    this.limit--

                }

            }

        },
        staminaAndHurt() {

            if (this.limitElixir <= 25 && this.limitElixir > 0) {

                if (this.playerStamina != 100) {

                    this.recoverStamina(10, 15)

                    this.hurt('playerLife', 7, 12, false, this.monsterName, this.nome, 'monster')

                    this.limitElixir--

                }

            }

        },
        heal(min, max) {

            const heal = this.getRandom(min, max)

            this.playerLife = Math.min(this.playerLife + heal, 100)
            
            this.registerLog(`${this.nome} recuperou ${heal} de vida.`, 'healer')

        },
        recoverStamina(min, max) {

            const recoverStamina = this.getRandom(min, max)

            this.playerStamina = Math.min(this.playerStamina + recoverStamina, 100)

            this.registerLog(`${this.nome} recuperou ${recoverStamina} de stamina.`, 'staminaA')

        },
        getRandom(min, max) {

            const value = Math.random() * (max - min) + min

            return Math.round(value)

        },
        registerLog(text, cls) {

            this.logs.splice(1)
            this.logs.unshift({
                text,
                cls
            })

        },
        alterarNome(event) {

            this.nome = event.target.value

        },
        raceSelectA(event) {

            this.image = this.race[0]

            this.special = this.specialimg1

            this.weapon = this.weapon1

        },
        raceSelectB(event) {

            this.image = this.race[1]

            this.special = this.specialimg1

            this.weapon = this.weapon1

        },
        raceSelectC(event) {

            this.image = this.race[2]

            this.special = this.specialimg1

            this.weapon = this.weapon1

        },
        raceSelectD(event) {
            this.image = this.race[3]

            this.special = this.specialimg1

            this.weapon = this.weapon1

        },
        raceSelectE(event) {

            this.image = this.race[4]

            this.special = this.specialimg1

            this.weapon = this.weapon1

        },
        random(items) {

            return items[Math.floor(Math.random() * items.length)];

        },
        reload() {

            window.location.reload(true);

        }
    },
    watch: {

        hasResult(value) {
            if (value) this.running = false
        }

    },
})