const CLIENT_ID = '626398910403-apubsajfd3k00vlh52cc7r5p4np699p1.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyBCfJ5kpGw5mZ4x-wsxjjSb_DDWyw02aLY';
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
        const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

        let tokenClient;
        let gapiInited = false;
        let gisInited = false;

        // Callback after api.js is loaded
        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        // Callback after the API client is loaded
        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        // Callback after Google Identity Services are loaded
        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        // Enables user interaction after all libraries are loaded
        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                document.getElementById('authorize_button').style.visibility = 'visible';
                document.getElementById('authorize_button').classList.remove('hidden');
            }
        }

        // Sign in the user upon button click
        function handleAuthClick() {
            tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw (resp);
                }
                document.getElementById('signout_button').classList.remove('hidden');
                document.getElementById('authorize_button').innerText = 'Atualizar Calendário';
                await listUpcomingEvents();
            };

            if (gapi.client.getToken() === null) {
                tokenClient.requestAccessToken({prompt: 'consent'});
            } else {
                tokenClient.requestAccessToken({prompt: ''});
            }
        }

        // Sign out the user upon button click
        function handleSignoutClick() {
            const token = gapi.client.getToken();
            if (token !== null) {
                google.accounts.oauth2.revoke(token.access_token);
                gapi.client.setToken('');
                document.getElementById('content').innerText = '';
                document.getElementById('authorize_button').innerText = 'Conectar ao Google Calendar';
                document.getElementById('signout_button').classList.add('hidden');
            }
        }

        // List upcoming events
        async function listUpcomingEvents() {
            let response;
            try {
                const request = {
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime',
                };
                response = await gapi.client.calendar.events.list(request);
            } catch (err) {
                document.getElementById('content').innerText = 'Erro ao carregar eventos: ' + err.message;
                return;
            }

            const events = response.result.items;
            if (!events || events.length == 0) {
                document.getElementById('content').innerText = 'Nenhum evento encontrado nos próximos dias.';
                return;
            }

            // Format events for display
            const output = events.reduce(
                (str, event) => {
                    const dateTime = event.start.dateTime || event.start.date;
                    const formattedDate = new Date(dateTime).toLocaleString('pt-BR');
                    return `${str}📅 ${event.summary} - ${formattedDate}\n`;
                },
                'Próximos eventos do calendário:\n\n'
            );
            document.getElementById('content').innerText = output;
        }

        // Mobile menu toggle
        function toggleMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        }

        // Smooth scrolling for anchor links
        document.addEventListener('DOMContentLoaded', function() {
            const agendarBtn = document.querySelector('.agendar-btn');
            agendarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('agendar').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            // Add event listeners to auth buttons
            document.getElementById('authorize_button').addEventListener('click', handleAuthClick);
            document.getElementById('signout_button').addEventListener('click', handleSignoutClick);
        });