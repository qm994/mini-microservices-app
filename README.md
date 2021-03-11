# Initial Services Diagram 

![Screen Shot 2021-02-28 at 2 32 00 PM](https://user-images.githubusercontent.com/40004335/109431252-8e749f00-79d3-11eb-99f9-b36db257153c.png)


# After introduce the LoadBalancer and Ingress-Nginx

* LoadBalancer: It is exactly located outside the cluster and provisioned by our cloud provider.
 * Its role: Direct outside world traffic to the pod in the cluster. Here the pod is Ingress pod;
 
* Ingress-Nginx: Its consiste of a set of rules decide the incoming traffic will be routed to which service.
 * Clarification: Here the traffic wont directly go the pod. It will firstly go to the ClusterIP service then from there it will go to pod;

<img width="1374" alt="Screen Shot 2021-03-11 at 10 17 46 AM" src="https://user-images.githubusercontent.com/40004335/110809734-2e8fbb00-8253-11eb-9658-90dac785b014.png">

