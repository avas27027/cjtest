import apiCall from "../../services/KeyService";
const text = document.getElementById('test-text')
const api = apiCall.getInstance().fetchApiCall()

text.innerHTML = api