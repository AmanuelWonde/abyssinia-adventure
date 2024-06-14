import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Input, Form, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";
import Navbar from "../components/NavBar";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface FormData {
  name: string;
  description: string;
  location: string;
  city: string;
  region: string;
  category: string;
}
const PostPlace = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [placeDatas, setPlaceDatas] = useState<FormData>({
    name: "",
    description: "",
    location: "",
    city: "",
    region: "",
    category: "",
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePostPlace = async () => {
    const formData = new FormData();

    Object.entries(placeDatas).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fileList.forEach((fileObj, _index) => {
      if (fileObj.originFileObj)
        formData.append(`images[]`, fileObj.originFileObj);
    });
    try {
      const res = await axios.post(
        "http://localhost:8000/place/postPlace.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.statusText === "OK") {
        setPlaceDatas({
          name: "",
          description: "",
          location: "",
          city: "",
          region: "",
          category: "",
        });
        setFileList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar color="bg-gray-900" />

      <Form layout="vertical" className=" w-full flex justify-center mt-16">
        <div className=" w-[50%] bg-slate-100 p-6 rounded mt-4">
          <div className=" p-6 ">
            <div className=" flex space-x-8">
              <Form.Item label="Place name">
                <Input
                  style={{ width: 200 }}
                  placeholder="Fassiledes"
                  name="name"
                  value={placeDatas.name}
                  onChange={(e) =>
                    setPlaceDatas({ ...placeDatas, name: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Location">
                <Input
                  style={{ width: 200 }}
                  placeholder="Arounde tana"
                  name="location"
                  value={placeDatas.location}
                  onChange={(e) =>
                    setPlaceDatas({ ...placeDatas, location: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  value={placeDatas.category}
                  style={{ width: 200 }}
                  onChange={(value) =>
                    setPlaceDatas({ ...placeDatas, category: value })
                  }
                  options={[
                    { value: "Popular place", label: "Popular place" },
                    {
                      value: "Historical and Cultural Heritage",
                      label: "Historical and Cultural Heritage",
                    },
                    {
                      value: "Natural Wonders and Adventure",
                      label: "Natural Wonders and Adventure",
                    },
                    {
                      value: "Religious and Spiritual Journeys",
                      label: "Religious and Spiritual Journeys",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item label="About place" name={"description"}>
              <TextArea
                rows={4}
                value={placeDatas.description}
                placeholder="Place description here"
                onChange={(e) =>
                  setPlaceDatas({ ...placeDatas, description: e.target.value })
                }
              />
            </Form.Item>
            <div className=" flex space-x-8">
              <Form.Item label="Region">
                <Input
                  placeholder="Amhara"
                  name="region"
                  value={placeDatas.region}
                  onChange={(e) =>
                    setPlaceDatas({ ...placeDatas, region: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item label="City">
                <Input
                  placeholder="Bahirdar"
                  name="city"
                  value={placeDatas.city}
                  onChange={(e) =>
                    setPlaceDatas({ ...placeDatas, city: e.target.value })
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className=" pb-3">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                width={"89px"}
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
                className=""
              />
            )}
          </div>
          <Button
            type="primary"
            className=" ml-6"
            size="large"
            onClick={handlePostPlace}
          >
            Post Place
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PostPlace;
