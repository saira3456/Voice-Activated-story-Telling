$(document).ready(function () {
    // Speech recognition setup
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    var finalTranscript = '';
    var isRecording = false;

    recognition.onresult = function (event) {
        var interimTranscript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript + ' ';
            }
        }
        $('#transcription').val(finalTranscript + interimTranscript);
    };

    $('#mic-button').click(function () {
        if (!isRecording) {
            isRecording = true;
            recognition.start();
            $('#mic-button').removeClass('not-recording').addClass('recording'); // Add this line
        } else {
            isRecording = false;
            recognition.stop();
            $('#mic-button').removeClass('recording').addClass('not-recording'); // Add this line
        }
    });

    $('#send-button').click(function () {
        var transcription = $('#transcription').val().toLowerCase().trim(); // Convert input to lowercase and trim whitespace
        generateStory(transcription);

        // Append user's message to chat history
        appendToChatHistory(transcription);
    });

    $(document).on('click', '.play-button', function () {
        var responseText = $(this).parent().text().trim();
        var speechSynthesis = window.speechSynthesis;
        var speech = new SpeechSynthesisUtterance(responseText);

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            $(this).html('<i class="fa fa-play"></i>');
        } else {
            speechSynthesis.speak(speech);
            $(this).html('<i class="fa fa-stop"></i>');
        }

        speech.onend = () => {
            $(this).html('<i class="fa fa-play"></i>');
        };
    });

    // Light mode toggle setup
    let isLightMode = false;
    const originalCSS = './start-screen.css';
    const lightModeCSS = './light mode.css';

    $('#light-mode-toggle').click(function () {
        if (isLightMode) {
            $('#main-stylesheet').attr('href', originalCSS);
            $('.light-mode-1').text('Light mode');
        } else {
            $('#main-stylesheet').attr('href', lightModeCSS);
            $('.light-mode-1').text('Dark mode');
        }
        isLightMode = !isLightMode;
    });

    // Function to generate story using GPT-2 API
    async function generateStory(prompt) {
        if (prompt === '') {
            $('#chat-container').append('<div class="chat-response">Please provide a valid input.</div>');
            return;
        }

        // Hide initial content and show chat container
        $('#initial-content').hide();
        $('#chat-container').show();

        // Append user's message
        $('#chat-container').append('<div class="chat-message">' + prompt + '</div>');

        // Fetch story from GPT-2 API
        try {
            const response = await fetch('http://localhost:5000/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Append GPT-2's response with a play button
            var responseHtml = '<div class="chat-response">' +
                data.response +
                '<button class="play-button"><i class="fa fa-play"></i></button>' +
                '</div>';
            $('#chat-container').append(responseHtml);

        } catch (error) {
            console.error('Error:', error);
            $('#chat-container').append('<div class="chat-response">Error generating response. Please try again later.</div>');
        }

        // Clear the input field
        $('#transcription').val('');
    }

    // Function to append a message to chat history
    function appendToChatHistory(message) {
        // Append message to chat history
        $('#chat-history').append('<div class="chat-history">' + message + '</div>');
    }

    // Clear chat history
    $('#clear-history').click(function () {
        $('#chat-history').empty();
    });
    const newChatButton = document.querySelector('.new-chat-button');
    newChatButton.addEventListener('click', () => {
        window.location.href = 'start-screen.html';
    });
    const logoutbutton = document.querySelector('.logout');
    logoutbutton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
    
});
