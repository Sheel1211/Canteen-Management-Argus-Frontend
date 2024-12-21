import { Modal } from "antd";

const ShowErrorModal = (errorData) => {
    // const errorMessages = Object.values(errorData).flat();

    console.log(typeof(errorData));
    const errorMessages = Array.isArray(errorData)
    ? errorData.flat() 
    : typeof errorData === 'string'
    ? [errorData] 
    : Object.values(errorData).flat(); 

    Modal.error({
        title: 'Error',
        content: (
            <ul>
                {errorMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        ),
        onOk: () => {}, 
    });
};

export default ShowErrorModal;