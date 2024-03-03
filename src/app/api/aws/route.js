import { EC2 } from "aws-sdk";
export const dynamic = "force-dynamic";

export async function GET(req, res) {
  // AWS credentials and region setup
  const awsConfig = {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
  };

  // Initialize EC2 client
  const ec2 = new EC2(awsConfig);

  // Start the EC2 instance (replace 'YOUR_INSTANCE_ID' with your instance ID)
  const params = {
    InstanceIds: [process.env.InstanceIds],
  };

  try {
    const { Reservations } = await ec2.describeInstances(params).promise();
    const instanceState = Reservations[0]?.Instances[0]?.State?.Name;

    if (instanceState === "running") {
      // Instance is already running, send a JSON response
      return Response.json({ message: "Instance is already running" });
    } else {
      await ec2.startInstances(params).promise();
      return Response.json({ message: "Instance started successfully" });
    }
  } catch (error) {
    console.error("Error starting instance:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
