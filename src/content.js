function GetMessages() {
    return document.getElementsByClassName("_58nk"); 
}

function GetCodeSnippets() {
    return document.getElementsByClassName("_wu0"); 
};

function GetEncryptedMessages() {
    return document.getElementsByClassName("enc");
};

function GetDecryptedMessages() {
    return document.getElementsByClassName("dec"); 
};

function GetuserName() {
    let profileURL = document.querySelectorAll("a._3oh-").innerHTML;
    return profileURL.substr(profileURL.lastIndexOf('/') + 1);
}

function GetName() {
    return document.querySelectorAll("div._3eur")[0].children[0].innerHTML;
}

function AddDecryptClassTag(callback) {
    let codeSnippets = GetCodeSnippets();
    for(let message of codeSnippets) {
        let element = message.children[0]
        if(!element.className.includes("dec")) {
            message.getElementsByTagName("div")[0].className += " dec";      
        }
    }

    let messages = GetMessages();
    for(let message of messages) {
        if(!message.className.includes("dec")) {
            message.getElementsByTagName("div")[0].className += " dec";      
        }
    }

    callback();
}

setTimeout(function() {
    let numMessages = GetMessages().length + GetCodeSnippets().length;
    setInterval(function() {
        if(numMessages >= GetMessages().length + GetCodeSnippets().length) {
            AddDecryptClassTag(function() {
                let decryptedMessages = GetDecryptedMessages();
                numMessages = decryptedMessages.length
                console.log(decryptedMessages);
                chrome.runtime.sendMessage({Messages: decryptedMessages}, function(response) {
                    console.log(response.EncryptedMessages)
                });
            });
        }
    }, 1000);
}, 10000);