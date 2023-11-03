---
title: A* path-finding algorithm for a robot 
layout: code
---

Path finding algorithm of a robot named "minik", running The Robot Operating System (ROS) 

It detects obstacles with its camera and takes the shortest route to its target, avoiding obstacles 

## rosThread.h

```h
#include <ros/ros.h>
#include <tf/tf.h>
#include <QDebug>
#include <QVector>
#include <QObject>
#include <nav_msgs/Odometry.h>
#include <geometry_msgs/Pose.h>
#include <std_msgs/Float32MultiArray.h>
#include <minik_ros_wrapper/minikSetVelocityMsg.h>
#include "math.h"

using namespace std;

struct Obstacle{
public:
    double x;
    double y;
    double r;
};

class RosThread:public QObject
{
    Q_OBJECT

public:
    RosThread();
    ~RosThread();

private:
    ros::NodeHandle n;
    ros::Publisher velPub;
    ros::Subscriber odomSub;
    ros::Subscriber targetSub;
    ros::Subscriber obstacleSub;

    // Define the global variables and prototype functions here

    static constexpr double wheelRad = 0.045; // in meters
    static constexpr double robotRadius = 0.1; // in meters

    double travelDistance; //total travelled distance

    double robotX;  // in meters
    double robotY;  // in meters
    double robotTh; // in radians

    double targetX; // in meters
    double targetY; // in meters
    double targetTh; // in radians
    
    int completed;

    std::vector<Obstacle> obstacles;

    void demoLoop();
    void odomHandler(const nav_msgs::OdometryConstPtr &odomMsg);
    void targetHandler(const geometry_msgs::PoseConstPtr &targetMsg);
    void obstacleHandler(const std_msgs::Float32MultiArrayConstPtr &obstacleMsg);

    void sendVelocityCommand(double leftWheel, double rightWheel); // meters per second
    static const int ticks_per_meter = 10610;

    double _lastX;
    double _lastY;

public slots:
     void work();

};

```

## rosThread.cpp

```cpp
#include "rosThread.h"

#include <iostream>

#include <cmath>

#include <vector>

#include <unistd.h>

#include <math.h>


using namespace std;
RosThread::RosThread() {
  robotX = 0;
  robotY = 0;
  robotTh = 0;

  targetX = 3;
  targetY = 3;

  travelDistance = 0;

  completed = 0;

  Obstacle temp1;

  temp1.x = 1;
  temp1.y = 1;
  temp1.r = 0.2;

  obstacles.push_back(temp1);

}

RosThread::~RosThread() {}

void RosThread::work() {

  velPub = n.advertise < minik_ros_wrapper::minikSetVelocityMsg > ("minik_ros_wrapper/minikSetVelocityMsg", 1);
  odomSub = n.subscribe("odom", 1, & RosThread::odomHandler, this);
  targetSub = n.subscribe("target", 1, & RosThread::targetHandler, this);
  obstacleSub = n.subscribe("obstacles", 1, & RosThread::obstacleHandler, this);

  ros::Rate loop(10);
  while (ros::ok()) {

    demoLoop();
    ros::spinOnce();
    loop.sleep();
  }

  qDebug() << "Quitting";
  ros::shutdown();
}

void RosThread::demoLoop() {
  sendVelocityCommand(0.2, -0.2);
  cout << "X: " << robotX << " \t Y: " << robotY << " \t Theta: " << robotTh << endl;
  if (obstacles.size() > 0) {
    cout << "oX: " << obstacles[0].x << " \t oY: " << obstacles[0].y << " \t oR: " << obstacles[0].r << endl;
  }
}

void RosThread::odomHandler(const nav_msgs::OdometryConstPtr & odomMsg) {

  //  ^ Y
  //  |				<-- Th
  //  |			      |
  //   -----> X   	
  robotX = odomMsg -> pose.pose.position.x;
  robotY = odomMsg -> pose.pose.position.y;

  tf::Quaternion q(odomMsg -> pose.pose.orientation.x, odomMsg -> pose.pose.orientation.y,
    odomMsg -> pose.pose.orientation.z, odomMsg -> pose.pose.orientation.w);
  tf::Matrix3x3 m(q);
  double roll, pitch, yaw;
  m.getRPY(roll, pitch, yaw);

  robotTh = yaw;

  travelDistance += sqrt(pow(robotX - _lastX, 2) + pow(robotY - _lastY, 2));
  _lastX = robotX;
  _lastY = robotY;
}

void RosThread::targetHandler(const geometry_msgs::PoseConstPtr & targetMsg) {

  targetX = targetMsg -> position.x;
  targetY = targetMsg -> position.y;

}

void RosThread::obstacleHandler(const std_msgs::Float32MultiArrayConstPtr & obstacleMsg) {

  obstacles.clear();

  for (int i = 0; i < obstacleMsg -> layout.dim[0].size; i++) {

    Obstacle temp;

    temp.x = obstacleMsg -> data[i * 3];
    temp.y = obstacleMsg -> data[i * 3 + 1];
    temp.r = obstacleMsg -> data[i * 3 + 2];

    obstacles.push_back(temp);
  }

}

void RosThread::sendVelocityCommand(double leftWheel, double rightWheel) {
  int leftTick = leftWheel * ticks_per_meter;
  int rightTick = rightWheel * ticks_per_meter;

  minik_ros_wrapper::minikSetVelocityMsg msg;

  vector < int > motorID;
  motorID.push_back(0);
  motorID.push_back(1);
  msg.motorID = motorID;

  vector < int > velocity;
  velocity.push_back(leftTick);
  velocity.push_back(rightTick);
  msg.velocity = velocity;

  velPub.publish(msg);
}
```

## Robot Controller

```cpp

#include <iostream>

#include <tuple>

#include <cmath>


const double PI = 3.141592653589793238463;

using namespace std;

class RobotController {
  float robotRadius = 0.1;

  float obstacleRadius = 0.2;

  float vMax = 0.2;
  float wMax = PI / 2;

  float epsilon = 0.01;
  int initial_degree = 0;

  float axleLength = 0.2;
  float wheelRadius = 0.045;
  float wheelCircumference = 2 * PI * wheelRadius;
  float topViewRobotCircumference = PI * axleLength;

  float obstaclePositions[3][3];
  float robotPosition[3] = {
    0,
    0,
    0
  };
  float robotOrientation[3];

  bool leftCameraDetectedObstacle;
  float distanceLeft;
  float leftPosition[];

  bool rightCameraDetectedObstacle;
  float distanceRight;
  float rightPosition[];

  tuple < float, float > subtract_arrays(float x[], float y[]) {
    float dx = x[0] - y[0];
    float dy = x[1] - y[1];
    return make_tuple(dx, dy);
  }

  float euclidean_distance(float dx, float dy) {
    return dx * dx + dy * dy;
  }

  float get_distance(float currentPosition[], float distantPosition[]) {
    float dx, dy;
    tie(dx, dy) = subtract_arrays(currentPosition, distantPosition);
    float distance = euclidean_distance(dx, dy);
    return distance;
  }

  public: void go() {
    bool is_first_obstacle = true;
    if (initial_degree < 360) {
      setRobotSpeed(0, 3);
      initial_degree = initial_degree + 6;

      if (leftCameraDetectedObstacle == true and is_first_obstacle == true) {
        obstaclePositions[0][0] = leftPosition[0] + robotPosition[0];
        obstaclePositions[0][1] = leftPosition[1] + robotPosition[1];
        obstaclePositions[0][2] = leftPosition[2] + robotPosition[2];

        is_first_obstacle = false;
      }

    } else {

      float robotTheta = robotOrientation[3] + PI / 2;

      // Get from cameras
      float goalPosition[3];
      float obstaclePositions[3][3];

      float distance_to_goal = get_distance(robotPosition, goalPosition);

      float position_of_middle_of_obstacles[3];
      float distance_from_middle_of_obstacles = get_distance(robotPosition, position_of_middle_of_obstacles);

      bool any_obstacle = true;
      float Fx, Fy;

      if (any_obstacle == true) {
        tie(Fx, Fy) = calculateGradient(position_of_middle_of_obstacles, robotPosition, obstaclePositions);

      } else {
        tie(Fx, Fy) = calculateGradient(goalPosition, robotPosition, obstaclePositions);
      }

      float v = 0;
      float w = 0;

      float Fmag = sqrt(Fx * Fx + Fy * Fy);
      float Fth = atan2(Fy, Fx);

      float th = Fth - robotTheta;

      v = vMax * cos(th);
      w = wMax * sin(th);

      if (distance_from_middle_of_obstacles < epsilon) {
        any_obstacle = false;
      }

      if (distance_to_goal < epsilon) {
        setRobotSpeed(0, 0);
      } else {
        setRobotSpeed(v, w);
      }

    }

  }

  bool sign(int x) {
    return (x > 0 and 1) or(x < 0 and - 1) or 0;
  }

  tuple < float, float > calculateGradient(float goalPosition[], float robotPosition[], float obstaclePositions[3][3]) {
    float Fx = 0;
    float Fy = 0;

    float dgx, dgy, do1x, do1y, do2x, do2y, do3x, do3y;

    tie(dgx, dgy) = subtract_arrays(robotPosition, goalPosition);

    tie(do1x, do1y) = subtract_arrays(robotPosition, obstaclePositions[0]);

    tie(do2x, do2y) = subtract_arrays(robotPosition, obstaclePositions[1]);

    tie(do3x, do3y) = subtract_arrays(robotPosition, obstaclePositions[2]);

    float gamma = dgx * dgx + dgy * dgy;

    float B1 = do1x * do1x + do1y * do1y - (robotRadius + obstacleRadius) * (robotRadius + obstacleRadius);
    float B2 = do2x * do2x + do2y * do2y - (robotRadius + obstacleRadius) * (robotRadius + obstacleRadius);
    float B3 = do3x * do3x + do3y * do3y - (robotRadius + obstacleRadius) * (robotRadius + obstacleRadius);

    float B = B1 * B2 * B3;

    int k = 5;
    Fx = (k * pow(gamma, k - 1) * 2 * dgx * B - pow(gamma, k) * (2 * do1x * B2 * B3 + 2 * do2x * B1 * B3 + 2 * do3x * B2 * B1)) / (B * B);
    Fy = (k * pow(gamma, k - 1) * 2 * dgy * B - pow(gamma, k) * (2 * do1y * B2 * B3 + 2 * do2y * B1 * B3 + 2 * do3y * B2 * B1)) / (B * B);

    return make_tuple(-Fx, -Fy);

  }

  void setRobotSpeed(float transVel, float rotVel) {
    // Convert speed to rad/sec
    transVel = transVel / wheelCircumference * 2 * PI;
    rotVel = rotVel * (topViewRobotCircumference / wheelCircumference);

    // Give speed to both left and right motor
    float leftMotorSpeed = transVel - rotVel;
    float rightMotorSpeed = -transVel - rotVel;

    int tau_max = 5;

    if (abs(leftMotorSpeed) > tau_max) {
      leftMotorSpeed = sign(leftMotorSpeed) * tau_max;
    }

    if (abs(rightMotorSpeed) > tau_max) {
      rightMotorSpeed = sign(rightMotorSpeed) * tau_max;
    }
  }

};

int main() {
  std::cout << "Hello World!\n";
  RobotController controller = RobotController();
  controller.go();

}
```