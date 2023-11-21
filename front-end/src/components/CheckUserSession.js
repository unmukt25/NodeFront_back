

export default function CheckUserSession() {

    const lstore = JSON.parse(localStorage.getItem('session'))
    console.log(lstore);
    if (lstore?.status) {
        fetch("http://localhost:3001/tokenvalid", {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + lstore.token
            }
        })
            .then(res => res.json())
            .then(function (json) {
                // formValue.submitReport = json;

                if (json.status === true) {

                }
                else {
                    localStorage.removeItem('session');
                    window.location.replace('/signin');
                    return false;
                }

                // console.log(alertMessage);

            })
    }
    else {
        window.location.replace('/signin');
        return false;
    }

    return true;
}
