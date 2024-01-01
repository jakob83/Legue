function makeBot(name, level) {
    let points = 0;
    return {
        name, isBot: true,
        getPoints: () => points,
        addPoints: (p) => points += p,
        resetPoints: () => points = 0,
        getLvl: () => level,
    }
};
function makeTeam(name) {
    let points = 0;
    const pointsContainer = document.querySelector("#playerPointsCont");
    const pointInput = document.createElement("input");
    pointInput.setAttribute("placeholder", `${name} points`)
    pointsContainer.appendChild(pointInput);
    function readPoints() {
        return +pointInput.value
    }
    return {
        name, isBot: false,
        getPoints: () => points,
        addPoints: (p) => points += p,
        readPoints,
        resetPoints: () => points = 0,
    }
};
allLeguesMan = (function () {
    let rounds = 0;
    function getMovedTeams(legue, what) {
        const [a, b] = what == "r" ? [legue[legue.length - 1], legue[legue.length - 2]] : [legue[0], legue[1]]
        return [a, b];
    }
    function finishSeason() {
        let rel1 = getMovedTeams(legue1Man.getLegue1(), "r");
        let prom2 = getMovedTeams(legue2Man.getLegue2(), "p");
        let rel2 = getMovedTeams(legue2Man.getLegue2(), "r");
        let prom3 = getMovedTeams(legue3Man.getLegue3(), "p");
        legue1Man.insertTeams(prom2);
        legue2Man.insertTeams(rel1.concat(prom3));
        legue3Man.insertTeams(rel2);

        legue1Man.deleteTeams(rel1);
        legue2Man.deleteTeams(prom2.concat(rel2));
        legue3Man.deleteTeams(prom3);
    }
    function resetLegues() {
        rounds = 0;
        legue1Man.resetPoints();
        legue2Man.resetPoints();
        legue3Man.resetPoints();
    }
    function getTeamInfo(team) {
        const name = team.name;
        let lvl = "This is a player";
        if (team.isBot) lvl = team.getLvl();
        return { name, lvl };
    }
    return { getMovedTeams, finishSeason, getRounds: () => rounds, addRound: () => rounds++, resetLegues, getTeamInfo }
})();
const legue1Man = (function () {
    const botNames = [
        "FC Strikers",
        "AS Hawks",
        "Gold Lions",
        "FC Colore",
        "Black Panthers",
        "FC Dribblers",
        "AS Makers",
        "Imperial Eagles",
        "Enchanting Unicorns",
        "SV Piniata",
        "Sapphire Strikers",
        "Scarlet Phoenixes",
        "FC Kickers",
        "FC Goated"
    ];
    const LVL = [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3]
    let legue1 = [];
    for (let i = 0; i < 14; i++) {
        const num = Math.floor(Math.random() * 22);
        const team = makeBot(`${botNames[i]}`, LVL[num])
        legue1.push(team);
    }
    function givePoints() {
        const points1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
        const points2 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
        const points3 = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
        legue1.forEach(team => {
            if (!team.isBot) {
                team.addPoints(team.readPoints());
                return;
            };
            const points = team.getLvl() == 1 ? points1 : team.getLvl() == 2 ? points2 : points3;
            const num = Math.floor(Math.random() * 15);
            team.addPoints(points[num]);
        })
    }
    function sortLegue() {
        legue1 = legue1.sort((a, b) => b.getPoints() - a.getPoints())
    }
    function deleteTeams(teams) {
        teams.forEach(team => legue1.splice(legue1.indexOf(team), 1))
    }
    function insertTeams(teams) {
        legue1.push(...teams);
    }
    function resetPoints() {
        legue1.forEach(team => team.resetPoints());
    }
    return { getLegue1: () => legue1, givePoints, sortLegue, insertTeams, deleteTeams, resetPoints }
})();

const legue2Man = (function () {
    const botNames = [
        "FC Nova",
        "AS Solaris",
        "Thunder FC",
        "Eagle AS",
        "Blaze FC",
        "Mystic AS",
        "Pinnacle FC",
        "Serenity AS",
        "FC Velocity",
        "Silver AS",
        "Eclipse FC",
        "AS Zenith",
        "Phoenix FC",
        "Lunar AS"
    ];
    let legue2 = [];
    const LVL = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3];
    function fillBots() {
        for (let i = legue2.length; i < 14; i++) {
            const num = Math.floor(Math.random() * 22);
            const team = makeBot(`${botNames[i]}`, LVL[num])
            legue2.push(team);
        }
    }
    function givePoints() {
        const points1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
        const points2 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
        const points3 = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
        legue2.forEach(team => {
            if (!team.isBot) {
                team.addPoints(team.readPoints());
                return;
            };
            const points = team.getLvl() == 1 ? points1 : team.getLvl() == 2 ? points2 : points3;
            const num = Math.floor(Math.random() * 15);
            team.addPoints(points[num]);
        })
    }
    function sortLegue() {
        legue2 = legue2.sort((a, b) => b.getPoints() - a.getPoints())
    }
    function addPlayer(team) {
        legue2.push(team);
    }
    function insertTeams(teams) {
        legue2.push(...teams);
    }
    function deleteTeams(teams) {
        teams.forEach(team => legue2.splice(legue2.indexOf(team), 1))
    }
    function resetPoints() {
        legue2.forEach(team => team.resetPoints());
    }
    return { getLegue2: () => legue2, givePoints, addPlayer, fillBots, sortLegue, insertTeams, deleteTeams, resetPoints, }
})();

const legue3Man = (function () {
    const botNames = [
        "FC Quantum",
        "AS Nebula",
        "Celestial FC",
        "Vortex AS",
        "Aurora FC",
        "Rogue AS",
        "FC Nebula",
        "Stellar AS",
        "Pulsar FC",
        "AS Quasar",
        "Cosmic FC",
        "FC Astro",
        "Pfolzna Amateure",
        "Spectrum FC"
    ];
    let legue3 = [];
    const LVL = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3];
    for (let i = 0; i < 14; i++) {
        const num = Math.floor(Math.random() * 22);
        const team = makeBot(`${botNames[i]}`, LVL[num])
        legue3.push(team);
    }
    function givePoints() {
        const points1 = [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3];
        const points2 = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
        const points3 = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3];
        legue3.forEach(team => {
            if (!team.isBot) {
                team.addPoints(team.readPoints());
                return;
            };
            const points = team.getLvl() == 1 ? points1 : team.getLvl() == 2 ? points2 : points3;
            const num = Math.floor(Math.random() * 15);
            team.addPoints(points[num]);
        })
    }
    function sortLegue() {
        legue3 = legue3.sort((a, b) => b.getPoints() - a.getPoints())
    }
    function insertTeams(teams) {
        legue3.push(...teams);
    }
    function deleteTeams(teams) {
        teams.forEach(team => legue3.splice(legue3.indexOf(team), 1))
    }
    function resetPoints() {
        legue3.forEach(team => team.resetPoints());
    }
    return { getLegue3: () => legue3, givePoints, sortLegue, insertTeams, deleteTeams, resetPoints }
})();

const gameUI = (function () {
    const startBtn = document.querySelector("#startBtn")
    const addPlayerCont = document.querySelector("#addPlayerCont")
    const addPlayerBtn = document.querySelector("#addPlayerBtn");
    const playRoundBtn = document.querySelector("#playRoundBtn");
    const playerNameInput = document.querySelector("#playerName");
    const closeEndDisplayBtn = document.getElementById("closeEndDisplay");
    const nxtSsnBtn = document.getElementById("nxtSsnBtn");
    const endDisplay = document.querySelector("#endDisplay");
    const nameFields = Array.from(document.querySelectorAll(".name"));
    const closeInfoSquare = document.getElementById("closeInfoSquare");
    const infoSquare = document.getElementById("infoSquare");


    //                           legueNum to know wich legue to display
    function displayLegue(legue, legueNum) {
        let namesP;
        let pointsP;
        if (legueNum == 1) {
            namesP = document.querySelectorAll(".place .name");
            pointsP = document.querySelectorAll(".place .points");
        }
        else if (legueNum == 2) {
            namesP = document.querySelectorAll(".place2 .name");
            pointsP = document.querySelectorAll(".place2 .points");
        }
        else if (legueNum == 3) {
            namesP = document.querySelectorAll(".place3 .name");
            pointsP = document.querySelectorAll(".place3 .points");
        }
        for (let i = 0; i < namesP.length; i++) {
            const team = legue[i];
            const name = namesP[i];
            const points = pointsP[i];
            points.innerText = team.getPoints();
            name.innerText = team.name;
        }
    }
    function writeBalance() {
        const winnerUI = document.getElementById("winner1");
        const rel1UI = document.getElementById("rel1");
        const prom2UI = document.getElementById("prom2");
        const rel2UI = document.getElementById("rel2");
        const prom3UI = document.getElementById("prom3");
        const rel3UI = document.getElementById("rel3");


        const winner = allLeguesMan.getMovedTeams(legue1Man.getLegue1(), "p")
        const rel1 = allLeguesMan.getMovedTeams(legue1Man.getLegue1(), "r");
        const prom2 = allLeguesMan.getMovedTeams(legue2Man.getLegue2(), "p");
        const rel2 = allLeguesMan.getMovedTeams(legue2Man.getLegue2(), "r");
        const prom3 = allLeguesMan.getMovedTeams(legue3Man.getLegue3(), "p");
        const rel3 = allLeguesMan.getMovedTeams(legue3Man.getLegue3(), "r");
        winnerUI.innerText = `${winner[0].name}`
        rel1UI.innerText = `${rel1[0].name}, ${rel1[1].name}`
        prom2UI.innerText = `${prom2[0].name}, ${prom2[1].name}`
        rel2UI.innerText = `${rel2[0].name}, ${rel2[1].name}`
        prom3UI.innerText = `${prom3[0].name}, ${prom3[1].name}`
        rel3UI.innerText = `${rel3[0].name}, ${rel3[1].name}`
    }
    function showEndDisplay() {
        if (endDisplay.style.display == "flex") {
            endDisplay.style.display = "none";
            return;
        }
        endDisplay.style.display = "flex";
    }
    function finishSeason() {
        writeBalance();
        showEndDisplay();
        nxtSsnBtn.style.display = "block";
    }

    addPlayerBtn.addEventListener("click", function () {

        addPlayerCont.style.display = "block";
    })
    const finalAdd = document.querySelector("#finalAdd");
    finalAdd.addEventListener("click", function () {
        //logic to add a team to legue 2
        const name = playerNameInput.value;
        const team = makeTeam(name);
        legue2Man.addPlayer(team);
    })
    startBtn.addEventListener("click", function () {
        legue2Man.fillBots();
        displayLegue(legue1Man.getLegue1(), 1);
        displayLegue(legue2Man.getLegue2(), 2);
        displayLegue(legue3Man.getLegue3(), 3);
    })
    playRoundBtn.addEventListener("click", function () {
        legue1Man.givePoints();
        legue2Man.givePoints();
        legue3Man.givePoints();

        legue1Man.sortLegue();
        legue2Man.sortLegue();
        legue3Man.sortLegue();

        displayLegue(legue1Man.getLegue1(), 1);
        displayLegue(legue2Man.getLegue2(), 2);
        displayLegue(legue3Man.getLegue3(), 3);
        allLeguesMan.addRound();
        console.log(allLeguesMan.getRounds());
        if (allLeguesMan.getRounds() >= 14) {
            finishSeason();
        }
    })
    nxtSsnBtn.addEventListener("click", function () {
        allLeguesMan.finishSeason();
        allLeguesMan.resetLegues();
        displayLegue(legue1Man.getLegue1(), 1);
        displayLegue(legue2Man.getLegue2(), 2);
        displayLegue(legue3Man.getLegue3(), 3);
        if (endDisplay.style.display == "flex") endDisplay.style.display = "none";
        nxtSsnBtn.style.display = "none";
    })
    closeEndDisplayBtn.addEventListener("click", showEndDisplay);



    nameFields.forEach(field => {
        field.addEventListener("click", function (e) {
            infoSquare.style.visibility = "visible";
            let l = e.target.dataset.l
            let index = nameFields.indexOf(e.target);
            index = l == 1 ? index : l == 2 ? index - 14 : index - 28;
            let info = null;
            if (l == 1) {
                info = allLeguesMan.getTeamInfo(legue1Man.getLegue1()[index]);
            }
            else if (l == 2) {
                info = allLeguesMan.getTeamInfo(legue2Man.getLegue2()[index]);
            }
            else {
                info = allLeguesMan.getTeamInfo(legue3Man.getLegue3()[index]);
            }
            const nameField = document.getElementById("nameField");
            const lvlField = document.getElementById("lvlField");
            nameField.innerText += "   " + info.name;
            lvlField.innerText += "   " + info.lvl;
        })
    })
    closeInfoSquare.addEventListener("click", function (e) {
        infoSquare.style.visibility = "hidden";
        const nameField = document.getElementById("nameField");
        const lvlField = document.getElementById("lvlField");
        nameField.innerText = "Name:";
        lvlField.innerText = "Level:";
    })
    return { finishSeason }
})();


