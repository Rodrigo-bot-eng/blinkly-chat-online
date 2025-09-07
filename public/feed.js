// ===============================
// feed.js — Blinkly Chat Online (Atualizado para perfil estilo Instagram)
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

// Música (opcional)
const goMusicBtn = document.getElementById('go-music');

// ========== Firebase ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, updateDoc, serverTimestamp, query, orderBy, where, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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

// ===============================
// Presença Online
// ===============================
function setupPresence(userId) {
  const userRef = rtdbRef(rtdb, 'activeUsers/' + userId);
  rtdbSet(userRef, { status: 'online', lastSeen: Date.now() });
  onDisconnect(userRef).set({ status: 'offline', lastSeen: Date.now() });
}

function subscribeOnlineCount() {
  const activeRef = rtdbRef(rtdb, 'activeUsers');
  rtdbOnValue(activeRef, (snapshot) => {
    onlineUsersCount && (onlineUsersCount.textContent = snapshot.exists() ? Object.keys(snapshot.val()).length : '0');
  });
}

// ===============================
// Autenticação e carregamento de perfil
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert('Você precisa fazer login.');
    chatInput && (chatInput.disabled = true);
    sendButton && (sendButton.disabled = true);
    return;
  }

  currentUser = user;

  const userDocRef = doc(db, 'users', currentUser.uid);
  const snapshot = await getDoc(userDocRef);
  if (!snapshot.exists()) {
    await setDoc(userDocRef, {
      username: currentUser.displayName || 'Usuário',
      email: currentUser.email || '',
      photoURL: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200',
      createdAt: serverTimestamp(),
      usernameLower: (currentUser.displayName || 'Usuário').toLowerCase()
    }, { merge: true });
  }

  displayUsername && (displayUsername.textContent = currentUser.displayName || 'Usuário');
  userAvatarImg && (userAvatarImg.style.backgroundImage = `url('${currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200'}')`);

  chatInput && (chatInput.disabled = false);
  sendButton && (sendButton.disabled = false);

  setupPresence(currentUser.uid);
  subscribeOnlineCount();

  listenForMessages(currentRoom);
  listenForFriendRequests();
  loadPrivateRooms();

  profileUsernameInput && (profileUsernameInput.value = currentUser.displayName || '');
  modalAvatarPreview && (modalAvatarPreview.src = currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200');
});

// ===============================
// Chat
// ===============================
function listenForMessages(roomId) {
  const q = query(collection(db, `rooms/${roomId}/messages`), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    clearChat();
    snapshot.forEach((docSnap) => {
      const msg = docSnap.data();
      addMessage(msg.username, msg.text, msg.createdAt, msg.avatar, msg.uid);
    });
  });
}

async function sendMessage(text) {
  if (!currentUser || !text.trim()) return;
  await addDoc(collection(db, `rooms/${currentRoom}/messages`), {
    username: currentUser.displayName || 'Usuário',
    uid: currentUser.uid,
    text: text.trim(),
    createdAt: serverTimestamp(),
    avatar: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200'
  });
}

function addMessage(username, text, timestamp, avatarUrl, uid) {
  const msg = document.createElement('div');
  msg.classList.add('message-bubble');
  msg.classList.add(currentUser && uid === currentUser.uid ? 'own-message' : 'other-message');
  const time = (timestamp && timestamp.seconds) ? new Date(timestamp.seconds * 1000).toLocaleTimeString() : 'Agora';
  msg.innerHTML = `
    <div class="message-avatar" style="background-image: url('${avatarUrl || ''}')"></div>
    <div class="message-content">
      <span class="message-author">${escapeHTML(username || '')}</span>
      <p class="message-text">${escapeHTML(text || '')}</p>
      <span class="message-timestamp">${time}</span>
    </div>
  `;
   chatMessagesContainer.prepend(msg);
}

function clearChat() {
  if (chatMessagesContainer) chatMessagesContainer.innerHTML = '';
}

function escapeHTML(str) {
  return (str || '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
}

// ===============================
// Perfil estilo Instagram
// ===============================
if (saveProfileBtn) {
  saveProfileBtn.addEventListener('click', async () => {
    if (!currentUser) return;

    const newName = (profileUsernameInput?.value || '').trim();
    const avatarFile = avatarUploadInput?.files?.[0] || null;

    const userRef = doc(db, "users", currentUser.uid);
    const snap = await getDoc(userRef);
    const now = Date.now();
    const lastChange = snap.exists() ? (snap.data().lastNameChange || 0) : 0;
    const limit = 14 * 24 * 60 * 60 * 1000;

    if (newName && newName !== currentUser.displayName && (now - lastChange < limit)) {
      profileMessage && (profileMessage.textContent = 'Você só pode mudar o nome a cada 14 dias!');
      profileMessage && (profileMessage.style.color = 'orange');
      return;
    }

    let photoURL = currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200';

    if (avatarFile) {
      const fileRef = storageRef(storage, `avatars/${currentUser.uid}/${Date.now()}_${avatarFile.name}`);
      await uploadBytes(fileRef, avatarFile);
      photoURL = await getDownloadURL(fileRef);
    }

    await updateProfile(auth.currentUser, {
      displayName: newName || currentUser.displayName,
      photoURL
    });

    await setDoc(userRef, {
      username: auth.currentUser.displayName,
      usernameLower: (auth.currentUser.displayName || '').toLowerCase(),
      photoURL: photoURL,
      ...(newName && newName !== currentUser.displayName ? { lastNameChange: now } : {})
    }, { merge: true });

    displayUsername && (displayUsername.textContent = auth.currentUser.displayName || 'Usuário');
    userAvatarImg && (userAvatarImg.style.backgroundImage = `url('${photoURL}')`);
    modalAvatarPreview && (modalAvatarPreview.src = photoURL);
    profileMessage && (profileMessage.textContent = 'Perfil atualizado!');
    profileMessage && (profileMessage.style.color = 'green');
    setTimeout(() => profileEditModal && (profileEditModal.style.display = 'none'), 800);
  });
}

// Pré-visualização do avatar
if (avatarUploadInput) {
  avatarUploadInput.addEventListener('change', () => {
    const f = avatarUploadInput.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    modalAvatarPreview && (modalAvatarPreview.src = url);
  });
}

// ===============================
// Amigos
// ===============================
function listenForFriendRequests() {
  if (!currentUser) return;
  const friendRequestsRef = collection(db, `users/${currentUser.uid}/friendRequests`);
  const qReq = query(friendRequestsRef, orderBy('createdAt', 'desc'));
  onSnapshot(qReq, (snapshot) => renderFriendRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
}

function renderFriendRequests(requests) {
  if (!friendRequestsList) return;
  friendRequestsList.innerHTML = '';
  if (!requests.length) {
    const p = document.createElement('p');
    p.className = 'modal-message';
    p.textContent = 'Nenhuma solicitação pendente.';
    friendRequestsList.appendChild(p);
    return;
  }
  requests.forEach(req => {
    const div = document.createElement('div');
    div.className = 'friend-request-item';
    div.innerHTML = `<span>${escapeHTML(req.fromName || 'Usuário')}</span><button class="accept-btn">Aceitar</button>`;
    div.querySelector('.accept-btn').addEventListener('click', () => acceptFriendRequest(req.id, req.fromUid, req.fromName));
    friendRequestsList.appendChild(div);
  });
}

async function sendFriendRequestToUid(friendUid, friendName) {
  if (!currentUser || !friendUid) return;
  const friendRequestsRef = collection(db, `users/${friendUid}/friendRequests`);
  await addDoc(friendRequestsRef, {
    fromUid: currentUser.uid,
    fromName: currentUser.displayName || 'Usuário',
    createdAt: serverTimestamp()
  });
  alert('Solicitação enviada!');
}

async function acceptFriendRequest(requestId, fromUid, fromName) {
  if (!currentUser) return;
  try {
    const myFriendsRef = collection(db, `users/${currentUser.uid}/friends`);
    const otherFriendsRef = collection(db, `users/${fromUid}/friends`);
    await Promise.all([
      addDoc(myFriendsRef, { uid: fromUid, name: fromName || 'Usuário', createdAt: serverTimestamp() }),
      addDoc(otherFriendsRef, { uid: currentUser.uid, name: currentUser.displayName || 'Usuário', createdAt: serverTimestamp() })
    ]);
    await deleteDoc(doc(db, `users/${currentUser.uid}/friendRequests`, requestId));
    alert(`Você e ${fromName} agora são amigos!`);
  } catch (e) {
    console.error(e);
    alert('Erro ao aceitar solicitação.');
  }
}

if (searchFriendBtn) {
  searchFriendBtn.addEventListener('click', async () => {
    foundUserCache = null;
    foundUserProfileBox && (foundUserProfileBox.style.display = 'none');
    searchResultMessage && (searchResultMessage.textContent = 'Buscando...');
    const username = (friendUsernameSearchInput?.value || '').trim();
    if (!username) {
      searchResultMessage && (searchResultMessage.textContent = 'Digite um nome de usuário.');
      return;
    }
    try {
      let qUsers = query(collection(db, 'users'), where('username', '==', username));
      let snap = await getDocs(qUsers);
      if (snap.empty) {
        qUsers = query(collection(db, 'users'), where('usernameLower', '==', username.toLowerCase()));
        snap = await getDocs(qUsers);
      }
      if (snap.empty) {
        searchResultMessage && (searchResultMessage.textContent = 'Usuário não encontrado.');
        return;
      }
      const docUser = snap.docs[0];
      const data = docUser.data();
      foundUserCache = { uid: docUser.id, ...data };
      searchResultMessage && (searchResultMessage.textContent = '');
      foundUserAvatar && (foundUserAvatar.src = data.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200');
      foundUserName && (foundUserName.textContent = data.username || 'Usuário');
      foundUserProfileBox && (foundUserProfileBox.style.display = 'block');
    } catch (e) {
      console.error(e);
      searchResultMessage && (searchResultMessage.textContent = 'Erro ao buscar.');
    }
  });
}

if (sendFriendRequestBtn) {
  sendFriendRequestBtn.addEventListener('click', async () => {
    if (!foundUserCache) return;
    if (foundUserCache.uid === currentUser?.uid) {
      alert('Você não pode adicionar você mesmo 😅');
      return;
    }
    await sendFriendRequestToUid(foundUserCache.uid, foundUserCache.username);
    foundUserProfileBox && (foundUserProfileBox.style.display = 'none');
    friendUsernameSearchInput && (friendUsernameSearchInput.value = '');
    searchResultMessage && (searchResultMessage.textContent = 'Solicitação enviada!');
  });
}

// ===============================
// Salas Privadas
// ===============================
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function createRoom(roomName) {
  if (!currentUser || !roomName) return;
  try {
    const code = generateRoomCode();
    const roomsRef = collection(db, 'rooms');
    const docRef = await addDoc(roomsRef, {
      name: roomName,
      ownerUid: currentUser.uid,
      private: true,
      code,
      createdAt: serverTimestamp()
    });
    currentRoom = docRef.id;
    listenForMessages(currentRoom);
    createRoomCodeElement && (createRoomCodeElement.textContent = `Código: ${code}`);
    createRoomMessageElement && (createRoomMessageElement.textContent = 'Compartilhe com seus amigos!');
    alert(`Sala "${roomName}" criada!`);
    loadPrivateRooms();
  } catch (e) {
    console.error(e);
    alert('Erro ao criar sala.');
  }
}

async function joinRoomByCode(code) {
  try {
    const roomsRef = collection(db, 'rooms');
    const qRooms = query(roomsRef, where('code', '==', code));
    const snap = await getDocs(qRooms);
    if (snap.empty) {
      joinRoomMessageElement && (joinRoomMessageElement.textContent = 'Código inválido!');
      alert('Código inválido!');
      return;
    }
    const room = snap.docs[0];
    joinRoom(room.id, room.data().name);
  } catch (e) {
    console.error(e);
    alert('Erro ao entrar na sala.');
  }
}

function joinRoom(roomId, roomName) {
  currentRoom = roomId;
  listenForMessages(currentRoom);
  chatRoomName && (chatRoomName.textContent = roomName);
  chatInput && (chatInput.placeholder = `Conversar em ${roomName}`);
}

function loadPrivateRooms() {
  const roomsRef = collection(db, 'rooms');
  const qRooms = query(roomsRef, where('private', '==', true));
  onSnapshot(qRooms, (snapshot) => {
    const rooms = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    updatePrivateRoomsUI(rooms);
  });
}

function updatePrivateRoomsUI(rooms) {
  if (!privateRoomsList) return;
  privateRoomsList.innerHTML = '';
  rooms.forEach(room => {
    const li = document.createElement('li');
    li.className = 'private-room-item';
    li.dataset.roomId = room.id;
    li.textContent = room.name || 'Sala privada';
    li.addEventListener('click', () => joinRoom(room.id, room.name || 'Sala Privada'));
    privateRoomsList.appendChild(li);
  });
}

// ===============================
// Tema & Notificações
// ===============================
function loadTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.className = saved;
  themeSelect && (themeSelect.value = saved);
}
function loadNotificationSetting() {
  const enabled = localStorage.getItem('notifications') === 'true';
  notificationToggle && (notificationToggle.checked = enabled);
}

// ===============================
// Modais util
// ===============================
function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}
function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

// ===============================
// Eventos DOM
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  sendButton && sendButton.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (!val) return;
    sendMessage(val);
    chatInput.value = '';
  });
  chatInput && chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendButton?.click(); });

  // Salas públicas
  roomItems?.forEach(item => item.addEventListener('click', () => {
    roomItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const roomId = item.dataset.roomId;
    currentRoom = roomId;
    listenForMessages(roomId);
    chatRoomName && (chatRoomName.textContent = item.textContent);
    chatInput && (chatInput.placeholder = `Conversar em ${item.textContent}`);
  }));

  // Perfil
  userAvatarImg && userAvatarImg.addEventListener('click', () => openModal(profileEditModal));
  openProfileModalBtn && openProfileModalBtn.addEventListener('click', () => openModal(profileEditModal));
  closeProfileModalBtn && closeProfileModalBtn.addEventListener('click', () => closeModal(profileEditModal));
  profileEditModal && profileEditModal.addEventListener('click', (e) => { if (e.target === profileEditModal) closeModal(profileEditModal); });

  // Salas privadas
  createRoomBtn && createRoomBtn.addEventListener('click', () => { createRoomMessageElement && (createRoomMessageElement.textContent = ''); createRoomCodeElement && (createRoomCodeElement.textContent = ''); openModal(createRoomModal); });
  closeCreateRoomBtn && closeCreateRoomBtn.addEventListener('click', () => closeModal(createRoomModal));
  confirmCreateRoomBtn && confirmCreateRoomBtn.addEventListener('click', () => { const roomName = (newRoomNameInput?.value || '').trim(); if (!roomName) { createRoomMessageElement && (createRoomMessageElement.textContent = 'Digite um nome.'); return; } createRoom(roomName); });

  joinRoomBtn && joinRoomBtn.addEventListener('click', () => { joinRoomMessageElement && (joinRoomMessageElement.textContent = ''); openModal(joinRoomModal); });
  closeJoinRoomBtn && closeJoinRoomBtn.addEventListener('click', () => closeModal(joinRoomModal));
  confirmJoinRoomBtn && confirmJoinRoomBtn.addEventListener('click', () => { const code = (joinRoomCodeInput?.value || '').trim().toUpperCase(); if (!code) { joinRoomMessageElement && (joinRoomMessageElement.textContent = 'Informe o código.'); return; } joinRoomByCode(code); });

  // Amigos
  openAddFriendModalBtn && openAddFriendModalBtn.addEventListener('click', () => { friendUsernameSearchInput && (friendUsernameSearchInput.value = ''); foundUserProfileBox && (foundUserProfileBox.style.display = 'none'); searchResultMessage && (searchResultMessage.textContent = ''); openModal(addFriendModal); });
  closeAddFriendModalBtn && closeAddFriendModalBtn.addEventListener('click', () => closeModal(addFriendModal));
  showRequestsBtn && showRequestsBtn.addEventListener('click', () => openModal(friendRequestsModal));
  closeFriendRequestsModalBtn && closeFriendRequestsModalBtn.addEventListener('click', () => closeModal(friendRequestsModal));

  // Configurações
  openSettingsModalBtn && openSettingsModalBtn.addEventListener('click', () => openModal(settingsModal));
  closeSettingsModalBtn && closeSettingsModalBtn.addEventListener('click', () => closeModal(settingsModal));

  themeSelect && themeSelect.addEventListener('change', () => { document.body.className = themeSelect.value; localStorage.setItem('theme', themeSelect.value); });
  notificationToggle && notificationToggle.addEventListener('change', () => { localStorage.setItem('notifications', !!notificationToggle.checked); });

  // Música
  goMusicBtn && goMusicBtn.addEventListener('click', () => window.location.href = 'musica.html');

  // Logout
  logoutBtn && logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.reload()));
  logoutBtnModal && logoutBtnModal.addEventListener('click', () => signOut(auth).then(() => window.location.reload()));

  // Carrega preferências
  loadTheme();
  loadNotificationSetting();
});

