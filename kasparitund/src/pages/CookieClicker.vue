<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const cookies = ref(0);
const totalCookies = ref(0);
const totalClicks = ref(0);
const goldenCookieClicks = ref(0);
const clickPower = ref(1);
const multiplier = ref(1);
const multiplierTime = ref(0);

const buildings = ref([
    { name: 'Cursor', price: 15, count: 0, cps: 0.1, emoji: '👆' },
    { name: 'Grandma', price: 100, count: 0, cps: 1, emoji: '👵' },
    { name: 'Farm', price: 1100, count: 0, cps: 8, emoji: '🌾' },
    { name: 'Factory', price: 130000, count: 0, cps: 260, emoji: '🏭' }
]);

const upgrades = ref([
    { name: 'Better Clicking', price: 100, bought: false, req: () => totalClicks.value >= 50, effect: () => clickPower.value *= 2 },
    { name: 'Cursor Power', price: 1000, bought: false, req: () => buildings.value[0].count >= 5, effect: () => buildings.value[0].cps *= 2 },
    { name: 'Grandma Boost', price: 5000, bought: false, req: () => buildings.value[1].count >= 5, effect: () => buildings.value[1].cps *= 2 }
]);

// Achievements
const achievements = ref([
    { name: 'First Cookie', desc: 'Bake 1 cookie', unlocked: false, check: () => totalCookies.value >= 1 },
    { name: 'Baker', desc: 'Bake 1,000 cookies', unlocked: false, check: () => totalCookies.value >= 1000 },
    { name: 'Clicker', desc: 'Click 100 times', unlocked: false, check: () => totalClicks.value >= 100 },
    { name: 'Lucky', desc: 'Click golden cookie', unlocked: false, check: () => goldenCookieClicks.value >= 1 }
]);

// Golden cookie
const goldenCookie = ref(null);
const activeTab = ref('buildings');

// Computed
const cps = computed(() => buildings.value.reduce((sum, b) => sum + b.cps * b.count, 0) * multiplier.value);
const availableUpgrades = computed(() => upgrades.value.filter(u => !u.bought && u.req()));

function clickCookie() {
    const gain = clickPower.value * multiplier.value;
    cookies.value += gain;
    totalCookies.value += gain;
    totalClicks.value++;
    checkAchievements();
}

function buyBuilding(building) {
    if (cookies.value >= building.price) {
        cookies.value -= building.price;
        building.price = Math.ceil(building.price * 1.15);
        building.count++;
    }
}

function buyUpgrade(upgrade) {
    if (cookies.value >= upgrade.price && !upgrade.bought) {
        cookies.value -= upgrade.price;
        upgrade.bought = true;
        upgrade.effect();
    }
}

function spawnGoldenCookie() {
    if (goldenCookie.value) return;
    goldenCookie.value = { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 };
    setTimeout(() => goldenCookie.value = null, 10000);
    setTimeout(spawnGoldenCookie, Math.random() * 120000 + 60000);
}

function clickGoldenCookie() {
    if (!goldenCookie.value) return;
    goldenCookie.value = null;
    goldenCookieClicks.value++;
    
    const effects = [
        () => { multiplier.value = 5; multiplierTime.value = 30; },
        () => { cookies.value += cps.value * 60; totalCookies.value += cps.value * 60; },
        () => { clickPower.value *= 10; setTimeout(() => clickPower.value /= 10, 10000); }
    ];
    effects[Math.floor(Math.random() * effects.length)]();
    checkAchievements();
}

function checkAchievements() {
    achievements.value.forEach(a => {
        if (!a.unlocked && a.check()) {
            a.unlocked = true;
            alert(`Achievement: ${a.name}!`);
        }
    });
}

function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    return (num / 1000000).toFixed(1) + 'M';
}

const gameInterval = setInterval(() => {
    cookies.value += cps.value;
    totalCookies.value += cps.value;
    if (multiplierTime.value > 0) {
        multiplierTime.value--;
        if (multiplierTime.value <= 0) multiplier.value = 1;
    }
    document.title = `🍪 ${formatNumber(cookies.value)} cookies`;
}, 1000);

onMounted(() => setTimeout(spawnGoldenCookie, 30000));
onUnmounted(() => clearInterval(gameInterval));
</script>

<template>
    <div class="columns">
        <div class="column is-4 has-background-primary has-text-centered">
            <h1 class="is-size-1 has-text-white">🍪 {{ formatNumber(cookies) }}</h1>
            <h3 class="is-size-3 has-text-white">{{ formatNumber(cps) }}/sec</h3>
            
            <div v-if="multiplier > 1" class="notification is-warning">
                🔥 Boost x{{ multiplier }} ({{ multiplierTime }}s)
            </div>
            
            <figure class="image is-square m-5">
                <img @click="clickCookie" class="is-rounded" 
                     src="https://pngimg.com/uploads/cookie/cookie_PNG13656.png"
                     style="cursor: pointer;" />
            </figure>
            
            <div class="box">
                <p>Clicks: {{ totalClicks }} | Golden: {{ goldenCookieClicks }}</p>
                <p>Achievements: {{ achievements.filter(a => a.unlocked).length }}/{{ achievements.length }}</p>
            </div>
        </div>

        <div class="column is-4 has-background-info">
            <div class="content p-4 has-text-white">
                <h2>Cookie Clicker+</h2>
                <p>Click cookie, buy buildings, find golden cookies!</p>
            </div>
        </div>

        <div class="column is-4 has-background-warning">
            <div class="tabs">
                <ul>
                    <li :class="{'is-active': activeTab === 'buildings'}">
                        <a @click="activeTab = 'buildings'">Buildings</a>
                    </li>
                    <li :class="{'is-active': activeTab === 'upgrades'}">
                        <a @click="activeTab = 'upgrades'">Upgrades</a>
                    </li>
                    <li :class="{'is-active': activeTab === 'achievements'}">
                        <a @click="activeTab = 'achievements'">Achievements</a>
                    </li>
                </ul>
            </div>

            <div v-if="activeTab === 'buildings'">
                <button v-for="building in buildings" :key="building.name"
                        class="button is-fullwidth mb-2"
                        :class="cookies >= building.price ? 'is-primary' : 'is-light'"
                        :disabled="cookies < building.price"
                        @click="buyBuilding(building)">
                    {{ building.emoji }} {{ building.name }} ({{ building.count }})
                    <br>🍪{{ formatNumber(building.price) }}
                </button>
            </div>

            <div v-if="activeTab === 'upgrades'">
                <div v-for="upgrade in availableUpgrades" :key="upgrade.name"
                     class="box mb-2 is-clickable"
                     :class="cookies >= upgrade.price ? 'has-background-success-light' : ''"
                     @click="buyUpgrade(upgrade)">
                    <strong>{{ upgrade.name }}</strong><br>
                    🍪{{ formatNumber(upgrade.price) }}
                </div>
                <p v-if="availableUpgrades.length === 0">No upgrades available</p>
            </div>

            <!-- Achievements -->
            <div v-if="activeTab === 'achievements'">
                <div v-for="achievement in achievements" :key="achievement.name"
                     class="box mb-2"
                     :class="achievement.unlocked ? 'has-background-success-light' : 'has-background-light'">
                    {{ achievement.unlocked ? '🏆' : '🔒' }} {{ achievement.name }}<br>
                    <small>{{ achievement.desc }}</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Golden Cookie -->
    <div v-if="goldenCookie" @click="clickGoldenCookie"
         :style="{
             position: 'fixed',
             left: goldenCookie.x + '%',
             top: goldenCookie.y + '%',
             width: '50px',
             height: '50px',
             background: 'gold',
             borderRadius: '50%',
             cursor: 'pointer',
             zIndex: 1000,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontSize: '20px'
         }">
        ✨
    </div>
</template>

<style scoped>
.is-clickable { cursor: pointer; }
</style>