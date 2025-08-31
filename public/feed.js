// --- Acessando elementos do DOM ---
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
const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const userAvatarImg = document.getElementById('user-avatar-img');
const themeSelect = document.getElementById('theme-select');
const notificationToggle = document.getElementById('notification-toggle');
const privateRoomsList = document.getElementById('private-rooms-list');
const profileForm = document.getElementById('profile-form');
const avatarInput = document.getElementById('avatar-url-input');

// Modais
const profileEditModal = document.getElementById('profile-edit-modal');
const openProfileModalBtn = document.getElementById('open-profile-modal-btn');
const closeProfileModalBtn = document.getElementById('close-profile-modal-btn');
const createRoomModal = document.getElementById('create-room-modal');
const closeCreateRoomBtn = document.getElementById('close-create-room-btn');
const createRoomForm = document.getElementById('create-room-form');
const createRoomCodeElement = document.getElementById('create-room-code');
const createRoomMessageElement = document.getElementById('create-room-message');
const joinRoomModal = document.getElementById('join-room-modal');
const closeJoinRoomBtn = document.getElementById('close-join-room-btn');
const joinRoomForm = document.getElementById('join-room-form');
const joinRoomMessageElement = document.getElementById('join-room-message');
const addFriendModal = document.getElementById('add-friend-modal');
const openAddFriendModalBtn = document.getElementById('open-add-friend-modal-btn');
const closeAddFriendModalBtn = document.getElementById('close-add-friend-modal-btn');
const friendRequestsModal = document.getElementById('friend-requests-modal');
const showRequestsBtn = document.getElementById('show-requests-btn');
const closeFriendRequestsModalBtn = document.getElementById('close-friend-requests-modal-btn');
const settingsModal = document.getElementById('settings-modal');
const openSettingsModalBtn = document.getElementById('open-settings-modal-btn');
const closeSettingsModalBtn = document.getElementById('close-settings-modal-btn');

// --- Firebase ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, serverTimestamp, query, orderBy, onSnapshot, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getDatabase, ref as rtdbRef, onValue as rtdbOnValue, onDisconnect, set as rtdbSet, remove as rtdbRemove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

let currentUser = null;
let currentRoom = 'general';

// --- Presença online com Realtime Database ---
function setupPresence(userId) {
  const userRef = rtdbRef(rtdb, 'activeUsers/' + userId);
  const presenceInfo = {
    status: 'online',
    lastSeen: serverTimestamp(),
  };

  // Definindo o usuário como online
  rtdbSet(userRef, presenceInfo);

  // Remover o usuário da lista quando ele desconectar
  onDisconnect(userRef).set({ status: 'offline', lastSeen: serverTimestamp() });
}

function subscribeOnlineCount() {
  const activeRef = rtdbRef(rtdb, 'activeUsers');
  rtdbOnValue(activeRef, (snapshot) => {
    if (snapshot.exists()) {  // Verifique se o snapshot tem dados
      const users = snapshot.val();  // Pega os dados do snapshot
      const count = Object.keys(users).length; // Conta os usuários online
      if (onlineUsersCount) onlineUsersCount.textContent = count;
    } else {
      if (onlineUsersCount) onlineUsersCount.textContent = '0'; // Se não houver dados
    }
  });
}

// --- Autenticação ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("Usuário logado:", currentUser.uid);

    displayUsername.textContent = user.displayName || 'Usuário';
    userAvatarImg.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200';

    chatInput.disabled = false;
    sendButton.disabled = false;

    setupPresence(user.uid);
    subscribeOnlineCount();

    listenForMessages(currentRoom);
    listenForFriendRequests();
    loadPrivateRooms();

  } else {
    alert("Você precisa fazer login para usar o chat.");
    chatInput.disabled = true;
    sendButton.disabled = true;
  }
});

// --- Ouvir mensagens ---
function listenForMessages(roomId) {
  const q = query(collection(db, `rooms/${roomId}/messages`), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    clearChat();
    snapshot.forEach((doc) => {
      const msg = doc.data();
      addMessage(msg.username, msg.text, msg.createdAt, msg.avatar);
    });
  });
}

// --- Enviar mensagem ---
async function sendMessage(text) {
  if (!currentUser || !text.trim()) return;

  try {
    await addDoc(collection(db, `rooms/${currentRoom}/messages`), {
      username: currentUser.displayName || 'Usuário',
      uid: currentUser.uid,
      text: text,
      createdAt: serverTimestamp(),
      avatar: currentUser.photoURL || 'https://www.gravatar.com/avatar/?d=retro&s=200'
    });
  } catch (e) {
    alert("Erro ao enviar mensagem.");
    console.error(e);
  }
}

// --- Adicionar mensagem no DOM ---
function addMessage(username, text, timestamp, avatarUrl) {
  const msg = document.createElement('div');
  msg.classList.add('message-bubble');
  if (currentUser && username === currentUser.displayName) {
    msg.classList.add('own-message');
  }

  const time = timestamp ? new Date(timestamp.seconds * 1000).toLocaleTimeString() : 'Agora';

  msg.innerHTML = `
    <div class="message-avatar" style="background-image: url('${avatarUrl}')"></div>
    <div class="message-content">
      <span class="message-author">${username}</span>
      <p class="message-text">${text}</p>
      <span class="message-timestamp">${time}</span>
    </div>
  `;
  chatMessagesContainer.prepend(msg);
}

// --- Logout ---
function handleLogout() {
  signOut(auth).then(() => window.location.reload());
}

// --- Utilitários de modal ---
function openModal(modal) {
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

function clearChat() {
  chatMessagesContainer.innerHTML = '';
}

// --- Tema ---
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.className = savedTheme;
  if (themeSelect) themeSelect.value = savedTheme;
}

// --- Notificações ---
function loadNotificationSetting() {
  const enabled = localStorage.getItem('notifications') === 'true';
  if (notificationToggle) notificationToggle.checked = enabled;
}

// --- Funções para amigos ---

// Envia solicitação de amizade para outro usuário pelo UID
async function sendFriendRequest(friendUid) {
  if (!currentUser || !friendUid) return;

  try {
    const friendRequestsRef = collection(db, `users/${friendUid}/friendRequests`);
    await addDoc(friendRequestsRef, {
      fromUid: currentUser.uid,
      fromName: currentUser.displayName || 'Usuário',
      createdAt: serverTimestamp(),
    });
    alert('Solicitação de amizade enviada!');
  } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    alert('Erro ao enviar solicitação de amizade.');
  }
}

// Ouve solicitações de amizade recebidas
function listenForFriendRequests() {
  if (!currentUser) return;

  const friendRequestsRef = collection(db, `users/${currentUser.uid}/friendRequests`);
  const q = query(friendRequestsRef, orderBy('createdAt', 'desc'));

  onSnapshot(q, (snapshot) => {
    const requests = [];
    snapshot.forEach(doc => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    updateFriendRequestsUI(requests);
  });
}

// Aceitar solicitação de amizade
async function acceptFriendRequest(requestId, fromUid, fromName) {
  if (!currentUser) return;

  try {
    // Adiciona aos amigos de ambos usuários
    const userFriendsRef = collection(db, `users/${currentUser.uid}/friends`);
    const friendFriendsRef = collection(db, `users/${fromUid}/friends`);

    await Promise.all([ 
      addDoc(userFriendsRef, { uid: fromUid, name: fromName }),
      addDoc(friendFriendsRef, { uid: currentUser.uid, name: currentUser.displayName || 'Usuário' }),
    ]);

    // Remove a solicitação
    const requestDocRef = doc(db, `users/${currentUser.uid}/friendRequests`, requestId);
    await deleteDoc(requestDocRef);

    alert(`Você e ${fromName} agora são amigos!`);
  } catch (error) {
    console.error('Erro ao aceitar solicitação:', error);
    alert('Erro ao aceitar solicitação.');
  }
}

// Atualiza UI com as solicitações (você deve implementar essa função para seu HTML)
function updateFriendRequestsUI(requests) {
  const container = document.getElementById('friend-requests-list');
  if (!container) return;

  container.innerHTML = '';
  requests.forEach(req => {
    const div = document.createElement('div');
    div.classList.add('friend-request-item');
    div.innerHTML = `
      <span>${req.fromName}</span>
      <button class="accept-btn" data-id="${req.id}" data-uid="${req.fromUid}" data-name="${req.fromName}">Aceitar</button>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.accept-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const uid = btn.getAttribute('data-uid');
      const name = btn.getAttribute('data-name');
      acceptFriendRequest(id, uid, name);
    });
  });
}

// --- Funções para salas ---

// Cria uma nova sala
async function createRoom(roomName, isPrivate = false) {
  if (!currentUser || !roomName) return;

  try {
    const roomsRef = collection(db, 'rooms');
    const docRef = await addDoc(roomsRef, {
      name: roomName,
      ownerUid: currentUser.uid,
      private: isPrivate,
      createdAt: serverTimestamp(),
    });

    currentRoom = docRef.id;
    listenForMessages(currentRoom);

    alert(`Sala "${roomName}" criada com sucesso!`);
    if (isPrivate) loadPrivateRooms();
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    alert('Erro ao criar sala.');
  }
}

// Carrega salas privadas e atualiza a UI
function loadPrivateRooms() {
  const roomsRef = collection(db, 'rooms');
  const q = query(roomsRef, where('private', '==', true));

  onSnapshot(q, (snapshot) => {
    const privateRooms = [];
    snapshot.forEach(doc => {
      privateRooms.push({ id: doc.id, ...doc.data() });
    });
    updatePrivateRoomsUI(privateRooms);
  });
}

// Atualiza UI com salas privadas (você deve implementar essa função)
function updatePrivateRoomsUI(rooms) {
  if (!privateRoomsList) return;

  privateRoomsList.innerHTML = '';
  rooms.forEach(room => {
    const li = document.createElement('li');
    li.classList.add('private-room-item');
    li.textContent = room.name;
    li.dataset.roomId = room.id;

    li.addEventListener('click', () => {
      joinRoom(room.id, room.name);
    });

    privateRoomsList.appendChild(li);
  });
}

// Entra em uma sala
function joinRoom(roomId, roomName) {
  currentRoom = roomId;
  listenForMessages(currentRoom);
  chatRoomName.textContent = roomName;
  chatInput.placeholder = `Conversar em ${roomName}`;
}

// --- Eventos DOM ---
document.addEventListener('DOMContentLoaded', () => {
  if (sendButton) {
    sendButton.addEventListener('click', () => {
      if (chatInput.value.trim() !== '') {
        sendMessage(chatInput.value);
        chatInput.value = '';
      }
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendButton.click();
    });
  }

  if (openProfileModalBtn) openProfileModalBtn.addEventListener('click', () => openModal(profileEditModal));
  if (closeProfileModalBtn) closeProfileModalBtn.addEventListener('click', () => closeModal(profileEditModal));

  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = profileForm.querySelector('#name-input')?.value;
      const newAvatar = avatarInput?.value;

      updateProfile(auth.currentUser, {
        displayName: newName || auth.currentUser.displayName,
        photoURL: newAvatar || auth.currentUser.photoURL
      }).then(() => {
        alert("Perfil atualizado!");
        window.location.reload();
      }).catch((error) => {
        console.error("Erro ao atualizar perfil:", error);
      });
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      document.body.className = themeSelect.value;
      localStorage.setItem('theme', themeSelect.value);
    });
  }

  if (notificationToggle) {
    notificationToggle.addEventListener('change', () => {
      localStorage.setItem('notifications', notificationToggle.checked);
    });
  }

  if (roomItems) {
    roomItems.forEach(item => {
      item.addEventListener('click', () => {
        roomItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentRoom = item.dataset.roomId;
        listenForMessages(currentRoom);
        chatRoomName.textContent = item.textContent;
        chatInput.placeholder = `Conversar em ${item.textContent}`;
      });
    });
  }

  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('logout-btn-modal')?.addEventListener('click', handleLogout);

  // Abrir modais
  if (openAddFriendModalBtn) openAddFriendModalBtn.addEventListener('click', () => openModal(addFriendModal));
  if (closeAddFriendModalBtn) closeAddFriendModalBtn.addEventListener('click', () => closeModal(addFriendModal));
  if (showRequestsBtn) showRequestsBtn.addEventListener('click', () => openModal(friendRequestsModal));
  if (closeFriendRequestsModalBtn) closeFriendRequestsModalBtn.addEventListener('click', () => closeModal(friendRequestsModal));

  if (createRoomBtn) createRoomBtn.addEventListener('click', () => openModal(createRoomModal));
  if (closeCreateRoomBtn) closeCreateRoomBtn.addEventListener('click', () => closeModal(createRoomModal));
  if (joinRoomBtn) joinRoomBtn.addEventListener('click', () => openModal(joinRoomModal));
  if (closeJoinRoomBtn) closeJoinRoomBtn.addEventListener('click', () => closeModal(joinRoomModal));

  if (createRoomForm) {
    createRoomForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomName = createRoomForm.querySelector('#room-name-input')?.value;
      const isPrivate = createRoomForm.querySelector('#private-room-checkbox')?.checked || false;
      createRoom(roomName, isPrivate);
      closeModal(createRoomModal);
    });
  }

  if (joinRoomForm) {
    joinRoomForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomId = joinRoomForm.querySelector('#room-id-input')?.value;
      if (roomId) {
        joinRoom(roomId, 'Sala Privada');
        closeModal(joinRoomModal);
      }
    });
  }

  // Exemplo: enviar solicitação de amizade com botão
  document.getElementById('send-friend-request-btn')?.addEventListener('click', () => {
    const friendUidInput = document.getElementById('friend-uid-input');
    if (friendUidInput?.value) {
      sendFriendRequest(friendUidInput.value);
      friendUidInput.value = '';
      closeModal(addFriendModal);
    }
  });

  loadTheme();
  loadNotificationSetting();
});
