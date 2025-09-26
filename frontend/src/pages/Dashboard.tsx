import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Progress, List, Avatar, Tag, Button, Tabs, Calendar, Badge, Typography, Space, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ProjectOutlined, MessageOutlined, DollarOutlined, CalendarOutlined, TrophyOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import './Dashboard.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Project {
  id: string;
  title: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  progress: number;
  budget: string;
  deadline: string;
  client: {
    name: string;
    avatar?: string;
  };
}

interface Task {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
  project: string;
}

interface Notification {
  id: string;
  type: 'PROJECT' | 'MESSAGE' | 'SYSTEM' | 'PAYMENT';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // 模拟数据
  const stats = {
    totalProjects: 24,
    activeProjects: 8,
    completedProjects: 16,
    totalEarnings: 125600,
    monthlyEarnings: 18500,
    pendingPayments: 5200,
    totalClients: 32,
    newClients: 5
  };

  const projects: Project[] = [
    {
      id: '1',
      title: '电商平台移动端UI设计',
      status: 'IN_PROGRESS',
      progress: 75,
      budget: '¥12,000',
      deadline: '2024-02-15',
      client: {
        name: '张先生',
        avatar: 'https://via.placeholder.com/32'
      }
    },
    {
      id: '2',
      title: '企业品牌视觉识别系统',
      status: 'IN_PROGRESS',
      progress: 45,
      budget: '¥25,000',
      deadline: '2024-02-20',
      client: {
        name: '李女士',
        avatar: 'https://via.placeholder.com/32'
      }
    },
    {
      id: '3',
      title: '餐厅网站设计',
      status: 'OPEN',
      progress: 0,
      budget: '¥8,000',
      deadline: '2024-03-01',
      client: {
        name: '王总',
        avatar: 'https://via.placeholder.com/32'
      }
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: '完成首页设计稿',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: '2024-01-18',
      project: '电商平台移动端UI设计'
    },
    {
      id: '2',
      title: '制作Logo设计方案',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: '2024-01-20',
      project: '企业品牌视觉识别系统'
    },
    {
      id: '3',
      title: '客户沟通确认需求',
      status: 'DONE',
      priority: 'HIGH',
      dueDate: '2024-01-15',
      project: '餐厅网站设计'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'PROJECT',
      title: '项目进度更新',
      content: '电商平台UI设计项目已完成75%',
      time: '2024-01-15 14:30',
      read: false
    },
    {
      id: '2',
      type: 'MESSAGE',
      title: '新消息',
      content: '张先生发来了项目反馈',
      time: '2024-01-15 12:15',
      read: false
    },
    {
      id: '3',
      type: 'PAYMENT',
      title: '收款提醒',
      content: '品牌设计项目款项已到账',
      time: '2024-01-15 10:00',
      read: true
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'OPEN': 'blue',
      'IN_PROGRESS': 'orange',
      'COMPLETED': 'green',
      'CANCELLED': 'red',
      'TODO': 'default',
      'DONE': 'green'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'OPEN': '招募中',
      'IN_PROGRESS': '进行中',
      'COMPLETED': '已完成',
      'CANCELLED': '已取消',
      'TODO': '待办',
      'DONE': '已完成'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'HIGH': 'red',
      'MEDIUM': 'orange',
      'LOW': 'green'
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      'HIGH': '高',
      'MEDIUM': '中',
      'LOW': '低'
    };
    return texts[priority as keyof typeof texts] || priority;
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      'PROJECT': <ProjectOutlined />,
      'MESSAGE': <MessageOutlined />,
      'SYSTEM': <UserOutlined />,
      'PAYMENT': <DollarOutlined />
    };
    return icons[type as keyof typeof icons] || <UserOutlined />;
  };

  const onSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const dateCellRender = (value: Dayjs) => {
    // 这里可以添加日历事件渲染逻辑
    const dateStr = value.format('YYYY-MM-DD');
    const hasEvent = ['2024-01-18', '2024-01-20', '2024-02-15'].includes(dateStr);
    
    if (hasEvent) {
      return (
        <div className="calendar-event">
          <Badge status="processing" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* 页面头部 */}
        <div className="dashboard-header">
          <Title level={2}>仪表盘</Title>
          <Text type="secondary">欢迎回来，查看您的项目进展</Text>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[24, 24]} className="stats-row">
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="总项目数"
                value={stats.totalProjects}
                prefix={<ProjectOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="进行中项目"
                value={stats.activeProjects}
                prefix={<ArrowUpOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="总收入"
                value={stats.totalEarnings}
                prefix={<DollarOutlined />}
                precision={0}
                valueStyle={{ color: '#faad14' }}
                formatter={(value) => `¥${value?.toLocaleString()}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="客户数量"
                value={stats.totalClients}
                prefix={<UserOutlined />}
                suffix={<span style={{ fontSize: '14px', color: '#52c41a' }}>+{stats.newClients}</span>}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 主要内容区域 */}
        <Row gutter={[24, 24]} className="content-row">
          <Col xs={24} lg={16}>
            <Tabs defaultActiveKey="projects" className="dashboard-tabs">
              <TabPane tab="项目列表" key="projects">
                <div className="projects-section">
                  {projects.map((project) => (
                    <Card key={project.id} className="project-card" hoverable>
                      <div className="project-header">
                        <div className="project-info">
                          <Title level={5}>{project.title}</Title>
                          <Tag color={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Tag>
                        </div>
                        <div className="project-meta">
                          <Text strong>{project.budget}</Text>
                        </div>
                      </div>
                      
                      <div className="project-progress">
                        <div className="progress-info">
                          <Text type="secondary">进度</Text>
                          <Text strong>{project.progress}%</Text>
                        </div>
                        <Progress percent={project.progress} strokeColor="#1890ff" />
                      </div>
                      
                      <div className="project-footer">
                        <div className="client-info">
                          <Avatar src={project.client.avatar} size="small" />
                          <Text>{project.client.name}</Text>
                        </div>
                        <div className="deadline">
                          <CalendarOutlined />
                          <Text type="secondary">{project.deadline}</Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>
              
              <TabPane tab="任务列表" key="tasks">
                <List
                  className="tasks-list"
                  dataSource={tasks}
                  renderItem={(task) => (
                    <List.Item className="task-item">
                      <List.Item.Meta
                        title={
                          <div className="task-title">
                            <span>{task.title}</span>
                            <Space>
                              <Tag color={getPriorityColor(task.priority)} size="small">
                                {getPriorityText(task.priority)}
                              </Tag>
                              <Tag color={getStatusColor(task.status)} size="small">
                                {getStatusText(task.status)}
                              </Tag>
                            </Space>
                          </div>
                        }
                        description={
                          <div className="task-meta">
                            <Text type="secondary">{task.project}</Text>
                            <Text type="secondary">截止：{task.dueDate}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              <TabPane tab="项目管理" key="management">
                <div className="management-section">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card title="项目统计" size="small">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic title="进行中" value={stats.activeProjects} />
                          </Col>
                          <Col span={12}>
                            <Statistic title="已完成" value={stats.completedProjects} />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="收入统计" size="small">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic 
                              title="本月收入" 
                              value={stats.monthlyEarnings} 
                              formatter={(value) => `¥${value?.toLocaleString()}`}
                            />
                          </Col>
                          <Col span={12}>
                            <Statistic 
                              title="待收款" 
                              value={stats.pendingPayments}
                              formatter={(value) => `¥${value?.toLocaleString()}`}
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              
              <TabPane tab="财务统计" key="finance">
                <div className="finance-section">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                      <Card>
                        <Statistic
                          title="总收入"
                          value={stats.totalEarnings}
                          formatter={(value) => `¥${value?.toLocaleString()}`}
                          valueStyle={{ color: '#52c41a' }}
                          prefix={<ArrowUpOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card>
                        <Statistic
                          title="本月收入"
                          value={stats.monthlyEarnings}
                          formatter={(value) => `¥${value?.toLocaleString()}`}
                          valueStyle={{ color: '#1890ff' }}
                        />
                      </Card>
                    </Col>
                    <Col xs={24} md={8}>
                      <Card>
                        <Statistic
                          title="待收款"
                          value={stats.pendingPayments}
                          formatter={(value) => `¥${value?.toLocaleString()}`}
                          valueStyle={{ color: '#faad14' }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
              
              <TabPane tab="数据分析" key="analytics">
                <div className="analytics-section">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Card title="项目完成率" size="small">
                        <div className="progress-circle">
                          <Progress
                            type="circle"
                            percent={Math.round((stats.completedProjects / stats.totalProjects) * 100)}
                            format={(percent) => `${percent}%`}
                          />
                        </div>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="客户满意度" size="small">
                        <div className="progress-circle">
                          <Progress
                            type="circle"
                            percent={95}
                            strokeColor="#52c41a"
                            format={(percent) => `${percent}%`}
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          
          <Col xs={24} lg={8}>
            <div className="sidebar">
              {/* 通知列表 */}
              <Card title="最新通知" className="notifications-card" size="small">
                <List
                  className="notifications-list"
                  dataSource={notifications.slice(0, 5)}
                  renderItem={(notification) => (
                    <List.Item className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                      <List.Item.Meta
                        avatar={getNotificationIcon(notification.type)}
                        title={notification.title}
                        description={
                          <div>
                            <Text type="secondary">{notification.content}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {notification.time}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
                <div className="notifications-footer">
                  <Button type="link" size="small">查看全部通知</Button>
                </div>
              </Card>
              
              {/* 日历 */}
              <Card title="项目日历" className="calendar-card" size="small">
                <Calendar
                  fullscreen={false}
                  onSelect={onSelectDate}
                  dateCellRender={dateCellRender}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;