import { useState } from 'react';
import { Input, Button , Upload , message } from 'antd';
import { UploadOutlined } from "@ant-design/icons";

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);


  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isValid = isImage && file.size / 1024 / 1024 < 1; // Maximum file size of 1MB
    if (!isImage) {
      message.error('You can only upload image files!');
      return
    } else if (!isValid) {
      message.error('Image size should be less than 1MB!');
      return
    }
    console.log(file , 'file')
    setFile(file)
    return isImage && isValid;
  };


  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Call the onSubmit function with the comment when the form is submitted
    onSubmit(comment,file);
    // Reset the comment input field
    setComment('');
  };

  return (
    <div>
      <Input.TextArea
        value={comment}
        onChange={handleChange}
        placeholder="Write your comment here..."
        rows={4}
      />

       <Upload 
        beforeUpload={handleBeforeUpload}
        showUploadList={true}
        multiple={false}
        maxCount={1}
      
        accept={"image/png,image/jpeg,image/jpg"}
        name="img" 
        listType="picture">
        <Button icon={<UploadOutlined />}   style={{marginTop:'1em'}}>Click to upload</Button>
      </Upload>
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 8 }}>
        Add Feedback
      </Button>
    </div>
  );
};

export default CommentForm;
