// ===============================
// feed.js — Blinkly Chat Online
// ===============================

// ========== DOM ==========
const appWrapper = document.getElementById('app-wrapper');
const mainSidebarNav = document.querySelector('.main-sidebar-nav');
const leftSidebar = document.querySelector('.left-sidebar');
const chatMainArea = document.querySelector('.chat-main-area');
const serverIcons = document.querySelectorAll('.server-icon');
const friendsSection = document.getElementById('friends-section');
const categoriesSection = document.getElementById('categories-section');
const friendsNavButtons = document.querySelectorAll('.friends-button');
const roomItems = document.querySelectorAll('.room-item');

const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-btn');
const chatRoomName = document.getElementById('chat-room-name');
const chatMessagesContainer = document.getElementById('chat-messages');
const onlineUsersCount = document.getElementById('online-users-count');
const displayUsername = document.getElementById('display-username');
const userAvatarImg = document.getElementById('user-avatar-img');

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const privateRoomsList = document.getElementById('private-rooms-list');

const themeSelect = document.getElementById('theme-select');
const notificationToggle = document.getElementById('notification-toggle');

// Modais – Perfil
const profileEditModal = document.getElementById('profile-edit-modal');
const openProfileModalBtn = document.getElementById('open-profile-modal-btn');
const closeProfileModalBtn = document.getElementById('close-profile-modal-btn');
const saveProfileBtn = document.getElementById('save-profile-btn');
const profileUsernameInput = document.getElementById('profile-username-input');
const avatarUploadInput = document.getElementById('avatar-upload');
const modalAvatarPreview = document.getElementById('modal-avatar-preview');
const profileMessage = document.getElementById('profile-message');

// Modais – Criar Sala
const createRoomModal = document.getElementById('create-room-modal');
const closeCreateRoomBtn = document.getElementById('close-create-room-btn');
const confirmCreateRoomBtn = document.getElementById('confirm-create-room-btn');
const newRoomNameInput = document.getElementById('new-room-name');
const createRoomMessageElement = document.getElementById('create-room-message');
const createRoomCodeElement = document.getElementById('generated-room-code');

// Modais – Entrar em Sala
const joinRoomModal = document.getElementById('join-room-modal');
const closeJoinRoomBtn = document.getElementById('close-join-room-btn');
const confirmJoinRoomBtn = document.getElementById('confirm-join-room-btn');
const joinRoomCodeInput = document.getElementById('join-room-code');
const joinRoomMessageElement = document.getElementById('join-room-message');

// Modais – Amigos
const addFriendModal = document.getElementById('add-friend-modal');
const openAddFriendModalBtn = document.getElementById('open-add-friend-modal-btn');
const closeAddFriendModalBtn = document.getElementById('close-add-friend-modal-btn');
const friendUsernameSearchInput = document.getElementById('friend-username-search');
const searchFriendBtn = document.getElementById('search-friend-btn');
const searchResultMessage = document.getElementById('search-result-message');
const foundUserProfileBox = document.getElementById('found-user-profile');
const foundUserAvatar = document.getElementById('found-user-avatar');
const foundUserName = document.getElementById('found-user-name');
const sendFriendRequestBtn = document.getElementById('send-friend-request-btn');
const dmListContainer = document.getElementById('dm-list-container');

const friendRequestsModal = document.getElementById('friend-requests-modal');
const showRequestsBtn = document.getElementById('show-requests-btn');
const closeFriendRequestsModalBtn = document.getElementById('close-friend-requests-modal-btn');
const friendRequestsList = document.getElementById('friend-requests-list');

// Modais – Configurações
const settingsModal = document.getElementById('settings-modal');
const openSettingsModalBtn = document.getElementById('open-settings-modal-btn');
const closeSettingsModalBtn = document.getElementById('close-settings-modal-btn');

// Botões de sair
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnModal = document.getElementById('logout-btn-modal');

// Música
const goMusicBtn = document.getElementById('go-music'); // opcional

// ========== Firebase ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, updateDoc, serverTimestamp, query, orderBy, onSnapshot, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase, ref as rtdbRef, onValue as rtdbOnValue, onDisconnect, set as rtdbSet } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBvho-095JnOAwTMCaQ8LxIROlpMCbAppw",
    authDomain: "blinkly-online-4169a.firebaseapp.com",
    projectId: "blinkly-online-4169a",
    storageBucket: "blinkly-online-4169a.firebasestorage.app",
    messagingSenderId: "1006187399372",
    appId: "1:1006187399372:web:0f4aafedfa74bcb2631a69",
    measurementId: "G-50JPVBRMR3",
    databaseURL: "https://blinkly-online-4169a-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

// ========== Estado ==========
let currentUser = null;
let currentRoom = 'publico';
let foundUserCache = null;
let currentDM = null; // armazena UID do usuário da conversa privada

// ================= Presença Online =================
function setupPresence(userId){
    const userRef = rtdbRef(rtdb, 'activeUsers/' + userId);
    rtdbSet(userRef, { status:'online', lastSeen:Date.now() });
    onDisconnect(userRef).set({ status:'offline', lastSeen:Date.now() });
}

function subscribeOnlineCount(){
    const activeRef = rtdbRef(rtdb, 'activeUsers');
    rtdbOnValue(activeRef, snapshot => {
        onlineUsersCount && (onlineUsersCount.textContent = snapshot.exists() ? Object.keys(snapshot.val()).length : '0');
    });
}

// ================= Autenticação =================
onAuthStateChanged(auth, async user => {
    if(!user){
        alert('Faça login para usar o chat');
        chatInput && (chatInput.disabled = true);
        sendButton && (sendButton.disabled = true);
        return;
    }

    currentUser = user;

    const userDocRef = doc(db, 'users', currentUser.uid);
    const snapshot = await getDoc(userDocRef);
    if(!snapshot.exists()){
        await setDoc(userDocRef, {
            username: currentUser.displayName || 'Usuário',
            email: currentUser.email || '',
            photoURL: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200',
            createdAt: serverTimestamp(),
            usernameLower: (currentUser.displayName || 'Usuário').toLowerCase()
        });
    }

    displayUsername && (displayUsername.textContent = currentUser.displayName || 'Usuário');
    if(userAvatarImg) userAvatarImg.style.backgroundImage = `url('${currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200'}')`;

    chatInput && (chatInput.disabled = false);
    sendButton && (sendButton.disabled = false);

    setupPresence(currentUser.uid);
    subscribeOnlineCount();

    listenForMessages(currentRoom);
    listenForFriendRequests();
    loadPrivateRooms();

    if(profileUsernameInput) profileUsernameInput.value = currentUser.displayName || '';
    if(modalAvatarPreview) modalAvatarPreview.src = currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200';

    loadDMList();
});

// ================= Chat =================
function listenForMessages(roomId){
    const q = query(collection(db, `rooms/${roomId}/messages`), orderBy('createdAt','desc'));
    onSnapshot(q, snapshot=>{
        clearChat();
        snapshot.forEach(docSnap=>{
            const msg = docSnap.data();
            addMessage(msg.username,msg.text,msg.createdAt,msg.avatar,msg.uid);
        });
    });
}

async function sendMessage(text){
    if(!currentUser || !text.trim()) return;

    if(currentDM){
        // DM privada
        const dmId = [currentUser.uid,currentDM].sort().join('_');
        await addDoc(collection(db, `dms/${dmId}/messages`),{
            username: currentUser.displayName,
            uid: currentUser.uid,
            text:text.trim(),
            avatar: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200',
            createdAt: serverTimestamp()
        });
    } else {
        await addDoc(collection(db, `rooms/${currentRoom}/messages`),{
            username: currentUser.displayName,
            uid: currentUser.uid,
            text:text.trim(),
            avatar: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200',
            createdAt: serverTimestamp()
        });
    }
    chatInput.value = '';
}

function addMessage(username,text,timestamp,avatarUrl,uid){
    const msg = document.createElement('div');
    msg.classList.add('message-bubble');
    if(uid === currentUser.uid) msg.classList.add('own-message');
    else msg.classList.add('other-message');

    const time = timestamp?.seconds ? new Date(timestamp.seconds*1000).toLocaleTimeString() : 'Agora';

    msg.innerHTML = `
        <div class="message-avatar" style="background-image:url('${avatarUrl || ''}')"></div>
        <div class="message-content">
            <span class="message-author">${escapeHTML(username)}</span>
            <p class="message-text">${escapeHTML(text)}</p>
            <span class="message-timestamp">${time}</span>
        </div>
    `;
    chatMessagesContainer && chatMessagesContainer.prepend(msg);
}

function clearChat(){ if(chatMessagesContainer) chatMessagesContainer.innerHTML = ''; }
function escapeHTML(str){ return (str||'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

// ================= Perfil =================
// Troca de avatar em tempo real
if(saveProfileBtn){
    saveProfileBtn.addEventListener('click',async ()=>{
        if(!currentUser) return;
        const newName = (profileUsernameInput?.value||'').trim();
        const avatarFile = avatarUploadInput?.files?.[0]||null;

        const userRef = doc(db,'users',currentUser.uid);
        const snap = await getDoc(userRef);
        const now = Date.now();
        const lastChange = snap.exists()? (snap.data().lastNameChange||0):0;
        const limit = 14*24*60*60*1000;

        if(newName && newName!==currentUser.displayName && (now-lastChange<limit)){
            profileMessage && (profileMessage.textContent='Só pode mudar o nome a cada 14 dias!');
            profileMessage && (profileMessage.style.color='orange');
            return;
        }

        let photoURL = currentUser.photoURL||'https://www.gravatar.com/avatar/?d=retro&s=200';
        if(avatarFile){
            const fileRef = storageRef(storage, `avatars/${currentUser.uid}/${Date.now()}_${avatarFile.name}`);
            await uploadBytes(fileRef, avatarFile);
            photoURL = await getDownloadURL(fileRef);
        }

        await updateProfile(auth.currentUser,{
            displayName: newName||currentUser.displayName,
            photoURL
        });

        await setDoc(userRef,{
            username: auth.currentUser.displayName,
            usernameLower: (auth.currentUser.displayName||'').toLowerCase(),
            photoURL,
            ...(newName&&newName!==currentUser.displayName? {lastNameChange:now}:{})
        },{merge:true});

        displayUsername && (displayUsername.textContent = auth.currentUser.displayName);
        userAvatarImg && (userAvatarImg.style.backgroundImage=`url('${photoURL}')`);
        modalAvatarPreview && (modalAvatarPreview.src = photoURL);
        profileMessage && (profileMessage.textContent='Perfil atualizado!');
        profileMessage && (profileMessage.style.color='green');
        setTimeout(()=>profileEditModal&&(profileEditModal.style.display='none'),800);
    });
}

if(avatarUploadInput){
    avatarUploadInput.addEventListener('change',()=>{
        const f = avatarUploadInput.files?.[0];
        if(!f) return;
        modalAvatarPreview.src = URL.createObjectURL(f);
    });
}

// ================= DM / Lista de amigos =================
async function loadDMList(){
    if(!currentUser) return;
    dmListContainer.innerHTML = '';
    const friendsQuery = query(collection(db,'users'));
    const friendsSnap = await getDocs(friendsQuery);
    friendsSnap.forEach(docSnap=>{
        const data = docSnap.data();
        if(data.uid !== currentUser.uid){
            const div = document.createElement('div');
            div.classList.add('dm-item');
            div.textContent = data.username;
            div.style.cursor='pointer';
            div.addEventListener('click',()=>{
                openDM(docSnap.id,data.username);
            });
            dmListContainer.appendChild(div);
        }
    });
}

function openDM(uid,username){
    currentDM = uid;
    chatRoomName.textContent = `DM com ${username}`;
    chatInput.disabled = false;
    sendButton.disabled = false;
    listenForDM(uid);
}

function listenForDM(uid){
    const dmId = [currentUser.uid,uid].sort().join('_');
    const q = query(collection(db, `dms/${dmId}/messages`), orderBy('createdAt','desc'));
    onSnapshot(q,snapshot=>{
        clearChat();
        snapshot.forEach(docSnap=>{
            const msg = docSnap.data();
            addMessage(msg.username,msg.text,msg.createdAt,msg.avatar,msg.uid);
        });
    });
}

// ================= Eventos =================
if(sendButton) sendButton.addEventListener('click',()=>sendMessage(chatInput.value));
if(chatInput) chatInput.addEventListener('keydown',e=>{ if(e.key==='Enter') sendMessage(chatInput.value); });

if(openProfileModalBtn) openProfileModalBtn.addEventListener('click',()=>profileEditModal&&(profileEditModal.style.display='flex'));
if(closeProfileModalBtn) closeProfileModalBtn.addEventListener('click',()=>profileEditModal&&(profileEditModal.style.display='none'));

if(openAddFriendModalBtn) openAddFriendModalBtn.addEventListener('click',()=>addFriendModal&&(addFriendModal.style.display='flex'));
if(closeAddFriendModalBtn) closeAddFriendModalBtn.addEventListener('click',()=>addFriendModal&&(addFriendModal.style.display='none'));

if(showRequestsBtn) showRequestsBtn.addEventListener('click',()=>friendRequestsModal&&(friendRequestsModal.style.display='flex'));
if(closeFriendRequestsModalBtn) closeFriendRequestsModalBtn.addEventListener('click',()=>friendRequestsModal&&(friendRequestsModal.style.display='none'));

if(openSettingsModalBtn) openSettingsModalBtn.addEventListener('click',()=>settingsModal&&(settingsModal.style.display='flex'));
if(closeSettingsModalBtn) closeSettingsModalBtn.addEventListener('click',()=>settingsModal&&(settingsModal.style.display='none'));

if(logoutBtn) logoutBtn.addEventListener('click',()=>signOut(auth));
if(logoutBtnModal) logoutBtnModal.addEventListener('click',()=>signOut(auth));

// ================= Tema =================
if(themeSelect) themeSelect.addEventListener('change',()=>{
    document.body.dataset.theme = themeSelect.value;
});
