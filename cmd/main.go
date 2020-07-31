package main

import (
	"context"
	"github.com/99designs/gqlgen/handler"
	"github.com/Lunar-Collective/go-graphql-lambda/graph"
	"github.com/Lunar-Collective/go-graphql-lambda/graph/generated"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/handlerfunc"
	"log"
)

var apiGatewayAdapter *handlerfunc.HandlerFuncAdapter

func init() {
	schema := generated.NewExecutableSchema(generated.Config{
		Resolvers: &graph.Resolver{},
	})
	gqlHandler := handler.GraphQL(schema)
	apiGatewayAdapter = handlerfunc.New(gqlHandler)
}

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	rsp, err := apiGatewayAdapter.ProxyWithContext(ctx, req)

	if err != nil {
		log.Println(err)
	}

	return rsp, err
}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(Handler)
}