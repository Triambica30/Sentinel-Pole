// ======================
// LIVE CLOCK
// ======================

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString();

}

setInterval(updateClock, 1000);
updateClock();


// ======================
// INCIDENT DATABASE (Simulation)
// ======================

const incidents = [];
//let currentIncident = null;

// Current selected incident
let currentIncident = 0;

// ======================
// BUILD INCIDENT LIST
// ======================

function renderIncidentList() {

    const list = document.getElementById("incidentList");

    list.innerHTML = "";

    incidents.forEach((incident, index) => {
        if (incident.status === "RESOLVED") return;

        let icon = "🔴";

        if (incident.status === "ACKNOWLEDGED")
            icon = "🟡";

        if (incident.status === "RESOLVED")
            icon = "🟢";

        const item = document.createElement("div");

        item.className = "incident-item";

        if(index === currentIncident)
            item.classList.add("active");

        item.innerHTML = `
            <strong>${icon} ${incident.id}</strong><br>
            ${incident.pole}
        `;

        item.onclick = function(){

            showIncident(index+1);

        };

        list.appendChild(item);

    });

}

// ======================
// SHOW INCIDENT
// ======================

function showIncident(index){
    console.log("showIncident called:", index);

    currentIncident = index-1;

    const incident = incidents[currentIncident];

    const items = document.querySelectorAll(".incident-item");

    items.forEach(item => item.classList.remove("active"));

    items[currentIncident].classList.add("active");

    document.getElementById("incidentTitle").innerHTML =
        incident.title;

    document.getElementById("incidentID").innerHTML =
        incident.id;

    document.getElementById("poleID").innerHTML =
        incident.pole;

    document.getElementById("incidentStatus").innerHTML =
        incident.status;

    renderIncidentList();
    renderHistory();

}

// ======================
// POLE DATABASE
// ======================

const poles = [

{
    id: "SP-001",
    status: "ONLINE",
    battery: 100,
    internet: "Connected"
},

{
    id: "SP-002",
    status: "ONLINE",
    battery: 92,
    internet: "Connected"
},

{
    id: "SP-003",
    status: "OFFLINE",
    battery: 0,
    internet: "Disconnected"
},

{
    id: "SP-004",
    status: "ONLINE",
    battery: 87,
    internet: "Connected"
},

{
    id: "SP-005",
    status: "ONLINE",
    battery: 95,
    internet: "Connected"
}

];

// ======================
// ACKNOWLEDGE
// ======================

function acknowledgeIncident(){

    incidents[currentIncident].status = "ACKNOWLEDGED";

    incidents[currentIncident].title =
        "🟡 Awaiting Response";

    showIncident(currentIncident + 1);

    updateDashboardStats();

    database.ref(
        "emergencies/" + incidents[currentIncident].id + "/status"
    ).set("ACKNOWLEDGED");

}


// ======================
// RESOLVE
// ======================

function resolveIncident(){

     if(confirm("Mark this incident as RESOLVED?")){

        const id = incidents[currentIncident].id;

        incidents[currentIncident].status = "RESOLVED";

        incidents[currentIncident].title =
            "✅ Incident Resolved";


        database.ref(
            "emergencies/" + id + "/status"
        ).set("RESOLVED");


        renderIncidentList();

        renderHistory();

        updateDashboardStats();
    } 

}


// ======================
// UPDATE DASHBOARD STATS
// ======================

function updateDashboardStats(){

    const totalPoles = poles.length;

    const onlinePoles = poles.filter(
        pole => pole.status === "ONLINE"
    ).length;

    const activeAlerts = incidents.filter(
        incident => incident.status !== "RESOLVED"
    ).length;

    const health =
        Math.round((onlinePoles / totalPoles) * 100);

    document.getElementById("totalPoles").innerHTML =
        totalPoles;

    document.getElementById("onlinePoles").innerHTML =
        onlinePoles;

    document.getElementById("activeAlerts").innerHTML =
        activeAlerts;

    document.getElementById("systemHealth").innerHTML =
        health + "%";

}

// ======================
// UPDATE POLE TABLE
// ======================

function updatePoleTable(){

    const table = document.getElementById("poleTableBody");

    table.innerHTML = "";

    poles.forEach(pole => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${pole.id}</td>

            <td class="${
                pole.status === "ONLINE"
                ? "online"
                : "offline"
            }">

                ${
                    pole.status === "ONLINE"
                    ? "🟢 Online"
                    : "🔴 Offline"
                }

            </td>

            <td>${pole.battery}%</td>

            <td>${pole.internet}</td>

            <td>Just Now</td>
        `;

        table.appendChild(row);

    });

}

// Load first incident automatically



// ======================
// SIMULATE POLE FAILURE
// ======================

function simulatePoleFailure(){

    // Make SP-002 offline
    poles[1].status = "OFFLINE";
    poles[1].battery = 0;
    poles[1].internet = "Disconnected";

    updateDashboardStats();

    updatePoleTable();

}

function restorePole(){

    poles[1].status = "ONLINE";

    poles[1].battery = 92;

    poles[1].internet = "Connected";

    updateDashboardStats();

    updatePoleTable();

}

function simulateEmergency(){

    const newIncident = {

        id: "INC-00" + (incidents.length + 1),

        pole: "SP-004",

        location: "Bus Stop",

        time: new Date().toLocaleTimeString(),

        status: "CRITICAL",

        title: "🚨 Critical Emergency"

    };

    incidents.push(newIncident);

    currentIncident = incidents.length - 1;

    renderIncidentList();

    showIncident(currentIncident + 1);

    document.getElementById("incidentTitle").innerHTML =
    "🚨 Critical Emergency";

    document.getElementById("incidentID").innerHTML =
    incidents[incidents.length-1].id;

    document.getElementById("poleID").innerHTML =
    "SP-004";

    document.getElementById("incidentStatus").innerHTML =
    "CRITICAL";

    updateDashboardStats();

    database.ref("emergencies/" + newIncident.id).set({

        incidentID: newIncident.id,

        poleID: newIncident.pole,

        location: newIncident.location,

        status: newIncident.status,

        time: newIncident.time

    });

    alert("🚨 Emergency Triggered Successfully!");

}

function renderHistory() {

    const history = document.getElementById("historyList");

    history.innerHTML = "";

    incidents.forEach(incident => {

        if (incident.status === "RESOLVED") {

            const item = document.createElement("div");

            item.className = "incident-item";

            item.innerHTML = `
                <strong>🟢 ${incident.id}</strong><br>
                ${incident.pole}
            `;

            history.appendChild(item);

        }

    });

}


database.ref("emergencies").on("child_added", function(snapshot) {

    const data = snapshot.val();

    // Ignore if already in the dashboard
    if (incidents.some(i => i.id === data.incidentID)) {
        return;
    }

    incidents.push({

        id: data.incidentID,

        pole: data.poleID,

        location: data.location,

        time: data.time,

        status: data.status,

        title: data.status === "CRITICAL"
            ? "🚨 Critical Emergency"
            : data.status === "ACKNOWLEDGED"
            ? "🟡 Awaiting Response"
            : "✅ Incident Resolved"

    });

    currentIncident = incidents.length - 1;

    renderIncidentList();

    showIncident(currentIncident + 1);

    updateDashboardStats();

    alert("🚨 New Emergency Received!");

});

renderIncidentList();
renderHistory();
updateDashboardStats();
updatePoleTable();
