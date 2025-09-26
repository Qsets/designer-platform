import React, { useState } from 'react';
import { Card, Avatar, Button, Typography, Row, Col, Tag, Tabs, Rate, Progress, Upload, Input, Form, message, Divider, Space, List, Badge } from 'antd';
import { EditOutlined, CameraOutlined, EnvironmentOutlined, LinkOutlined, CalendarOutlined, UserOutlined, ProjectOutlined, StarOutlined, EyeOutlined, HeartOutlined, UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import './Profile.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  role: 'DESIGNER' | 'CLIENT';
  bio?: string;
  location?: string;
  website?: string;
  skills: string[];
  joinDate: string;
  stats: {
    projects: number;
    followers: number;
    following: number;
    likes: number;
  };
}

interface Portfolio {
  id: string;
  title: string;
  image: string;
  category: string;
  likes: number;
  views: number;
  createdAt: string;
}

interface ProjectHistory {
  id: string;
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'CANCELLED';
  budget: string;
  completedAt?: string;
  rating?: number;
  client: {
    name: string;
    avatar?: string;
  };
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  project: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  
  // 模拟用户数据
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: '张设计师',
    avatar: 'https://via.placeholder.com/120',
    role: 'DESIGNER',
    bio: '专业的UI/UX设计师，拥有5年丰富的设计经验。擅长移动端设计、品牌设计和用户体验设计。热爱创新，注重细节，致力于为用户创造优秀的数字体验。',
    location: '上海市',
    website: 'https://zhangdesigner.com',
    skills: ['UI设计', 'UX设计', 'Figma', 'Sketch', 'Adobe XD', '原型设计', '交互设计', '品牌设计'],
    joinDate: '2020-03-15',
    stats: {
      projects: 48,
      followers: 1250,
      following: 320,
      likes: 3680
    }
  });

  // 模拟作品集数据
  const portfolios: Portfolio[] = [
    {
      id: '1',
      title: '电商App设计',
      image: 'https://via.placeholder.com/300x200',
      category: 'UI设计',
      likes: 128,
      views: 2340,
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: '企业品牌设计',
      image: 'https://via.placeholder.com/300x200',
      category: '品牌设计',
      likes: 95,
      views: 1890,
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      title: '网站重设计',
      image: 'https://via.placeholder.com/300x200',
      category: 'Web设计',
      likes: 156,
      views: 2780,
      createdAt: '2023-12-28'
    },
    {
      id: '4',
      title: '移动应用界面',
      image: 'https://via.placeholder.com/300x200',
      category: 'UI设计',
      likes: 203,
      views: 3450,
      createdAt: '2023-12-20'
    }
  ];

  // 模拟项目历史数据
  const projectHistory: ProjectHistory[] = [
    {
      id: '1',
      title: '电商平台移动端UI设计',
      status: 'COMPLETED',
      budget: '¥12,000',
      completedAt: '2024-01-15',
      rating: 5,
      client: {
        name: '张先生',
        avatar: 'https://via.placeholder.com/32'
      }
    },
    {
      id: '2',
      title: '企业品牌视觉识别系统',
      status: 'IN_PROGRESS',
      budget: '¥25,000',
      client: {
        name: '李女士',
        avatar: 'https://via.placeholder.com/32'
      }
    },
    {
      id: '3',
      title: '餐厅网站设计',
      status: 'COMPLETED',
      budget: '¥8,000',
      completedAt: '2023-12-20',
      rating: 4.5,
      client: {
        name: '王总',
        avatar: 'https://via.placeholder.com/32'
      }
    }
  ];

  // 模拟评价数据
  const reviews: Review[] = [
    {
      id: '1',
      rating: 5,
      comment: '非常专业的设计师，设计作品精美，沟通顺畅，交付及时。强烈推荐！',
      reviewer: {
        name: '张先生',
        avatar: 'https://via.placeholder.com/40'
      },
      createdAt: '2024-01-16',
      project: '电商平台移动端UI设计'
    },
    {
      id: '2',
      rating: 4.5,
      comment: '设计理念先进，能够准确把握需求，交付的作品超出预期。合作愉快！',
      reviewer: {
        name: '王总',
        avatar: 'https://via.placeholder.com/40'
      },
      createdAt: '2023-12-21',
      project: '餐厅网站设计'
    },
    {
      id: '3',
      rating: 5,
      comment: '非常满意的一次合作，设计师的专业水平和服务态度都很棒！',
      reviewer: {
        name: '李女士',
        avatar: 'https://via.placeholder.com/40'
      },
      createdAt: '2023-11-15',
      project: '品牌设计项目'
    }
  ];

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: '/api/upload/avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success('头像上传成功');
        // 这里可以更新用户头像
      } else if (info.file.status === 'error') {
        message.error('头像上传失败');
      }
    },
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      bio: userProfile.bio,
      location: userProfile.location,
      website: userProfile.website
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setUserProfile(prev => ({
        ...prev,
        ...values
      }));
      setIsEditing(false);
      message.success('个人信息更新成功');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'COMPLETED': 'green',
      'IN_PROGRESS': 'orange',
      'CANCELLED': 'red'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'COMPLETED': '已完成',
      'IN_PROGRESS': '进行中',
      'CANCELLED': '已取消'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getRoleText = (role: string) => {
    return role === 'DESIGNER' ? '设计师' : '业主';
  };

  const getRoleColor = (role: string) => {
    return role === 'DESIGNER' ? 'blue' : 'green';
  };

  return (
    <div className="profile-container">
      <div className="container">
        {/* 个人资料卡片 */}
        <Card className="profile-card">
          <div className="profile-header">
            <div className="avatar-section">
              <Avatar size={120} src={userProfile.avatar} className="profile-avatar" />
              <Upload {...uploadProps}>
                <Button 
                  icon={<CameraOutlined />} 
                  className="avatar-upload-btn"
                  size="small"
                >
                  更换头像
                </Button>
              </Upload>
            </div>
            
            <div className="profile-info">
              <div className="basic-info">
                <Title level={2}>{userProfile.name}</Title>
                <Tag color={getRoleColor(userProfile.role)} className="role-tag">
                  {getRoleText(userProfile.role)}
                </Tag>
              </div>
              
              {!isEditing ? (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />} 
                  onClick={handleEdit}
                  className="edit-btn"
                >
                  编辑资料
                </Button>
              ) : (
                <Space>
                  <Button 
                    type="primary" 
                    icon={<SaveOutlined />} 
                    onClick={handleSave}
                  >
                    保存
                  </Button>
                  <Button 
                    icon={<CloseOutlined />} 
                    onClick={handleCancel}
                  >
                    取消
                  </Button>
                </Space>
              )}
            </div>
          </div>

          {/* 编辑表单 */}
          {isEditing && (
            <Form form={form} layout="vertical" className="profile-form">
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    name="bio" 
                    label="个人简介"
                    rules={[{ max: 500, message: '个人简介不能超过500字' }]}
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="介绍一下您的专业背景和经验..."
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item name="location" label="所在地">
                    <Input placeholder="请输入所在地" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item 
                    name="website" 
                    label="个人网站"
                    rules={[{ type: 'url', message: '请输入正确的网址' }]}
                  >
                    <Input placeholder="https://" />
                  </Form.Item>
                </Col>
              </Row>
              
              <div className="form-actions">
                <Button type="primary" onClick={handleSave} icon={<SaveOutlined />}>
                  保存修改
                </Button>
                <Button onClick={handleCancel} icon={<CloseOutlined />}>
                  取消
                </Button>
              </div>
            </Form>
          )}

          {/* 个人详情 */}
          {!isEditing && (
            <div className="profile-details">
              {userProfile.bio && (
                <div className="bio-section">
                  <Paragraph>{userProfile.bio}</Paragraph>
                </div>
              )}
              
              <div className="info-grid">
                {userProfile.location && (
                  <div className="info-item">
                    <EnvironmentOutlined />
                    <Text>{userProfile.location}</Text>
                  </div>
                )}
                
                <div className="info-item">
                  <CalendarOutlined />
                  <Text>加入于 {new Date(userProfile.joinDate).toLocaleDateString()}</Text>
                </div>
                
                {userProfile.website && (
                  <div className="info-item">
                    <LinkOutlined />
                    <a href={userProfile.website} target="_blank" rel="noopener noreferrer">
                      {userProfile.website}
                    </a>
                  </div>
                )}
              </div>
              
              {/* 技能标签 */}
              <div className="skills-section">
                <Title level={5}>专业技能</Title>
                <div className="skills-tags">
                  {userProfile.skills.map((skill, index) => (
                    <Tag key={index} className="skill-tag">{skill}</Tag>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* 统计数据 */}
        <Row gutter={[24, 24]} className="stats-section">
          <Col xs={12} sm={6}>
            <Card className="stat-card">
              <div className="stat-content">
                <ProjectOutlined className="stat-icon" />
                <div>
                  <div className="stat-number">{userProfile.stats.projects}</div>
                  <div className="stat-label">项目</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card">
              <div className="stat-content">
                <UserOutlined className="stat-icon" />
                <div>
                  <div className="stat-number">{userProfile.stats.followers}</div>
                  <div className="stat-label">粉丝</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card">
              <div className="stat-content">
                <UserOutlined className="stat-icon" />
                <div>
                  <div className="stat-number">{userProfile.stats.following}</div>
                  <div className="stat-label">关注</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card">
              <div className="stat-content">
                <HeartOutlined className="stat-icon" />
                <div>
                  <div className="stat-number">{userProfile.stats.likes}</div>
                  <div className="stat-label">获赞</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 标签页内容 */}
        <Tabs defaultActiveKey="portfolio" className="profile-tabs">
          <TabPane tab="作品集" key="portfolio">
            <Row gutter={[24, 24]}>
              {portfolios.map((portfolio) => (
                <Col xs={24} sm={12} md={8} lg={6} key={portfolio.id}>
                  <Card
                    hoverable
                    className="portfolio-card"
                    cover={
                      <div className="portfolio-cover">
                        <img alt={portfolio.title} src={portfolio.image} />
                        <div className="portfolio-overlay">
                          <Button type="primary" icon={<EyeOutlined />}>
                            查看详情
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <Card.Meta
                      title={portfolio.title}
                      description={
                        <div className="portfolio-meta">
                          <Tag size="small">{portfolio.category}</Tag>
                          <div className="portfolio-stats">
                            <span><HeartOutlined /> {portfolio.likes}</span>
                            <span><EyeOutlined /> {portfolio.views}</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          
          <TabPane tab="项目历史" key="projects">
            <List
              className="project-history-list"
              dataSource={projectHistory}
              renderItem={(project) => (
                <List.Item className="project-history-item">
                  <List.Item.Meta
                    avatar={<Avatar src={project.client.avatar} />}
                    title={
                      <div className="project-title">
                        <span>{project.title}</span>
                        <Tag color={getStatusColor(project.status)}>
                          {getStatusText(project.status)}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="project-details">
                        <Text type="secondary">客户：{project.client.name}</Text>
                        <Text type="secondary">项目金额：{project.budget}</Text>
                        {project.completedAt && (
                          <Text type="secondary">
                            完成时间：{new Date(project.completedAt).toLocaleDateString()}
                          </Text>
                        )}
                        {project.rating && (
                          <div className="project-rating">
                            <Rate disabled defaultValue={project.rating} size="small" />
                            <Text type="secondary">({project.rating})</Text>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          
          <TabPane tab="评价" key="reviews">
            <List
              className="reviews-list"
              dataSource={reviews}
              renderItem={(review) => (
                <List.Item className="review-item">
                  <List.Item.Meta
                    avatar={<Avatar src={review.reviewer.avatar} />}
                    title={
                      <div className="review-header">
                        <span>{review.reviewer.name}</span>
                        <Rate disabled defaultValue={review.rating} size="small" />
                        <Text type="secondary" className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </Text>
                      </div>
                    }
                    description={
                      <div className="review-content">
                        <Paragraph>{review.comment}</Paragraph>
                        <Text type="secondary" className="review-project">
                          项目：{review.project}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;